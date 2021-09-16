module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const notice = { ...req.body }

        if (req.params.id) notice.id = req.params.id

        try {
            existsOrError(notice.name, 'Nome não informado.')
            existsOrError(notice.description, 'Descrição não informada.')
            existsOrError(notice.userId, 'Autor da postagem não informado.')
            existsOrError(notice.content, 'Conteúdo não informado.')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (notice.id) {
            app.db('notices')
                .update(notice)
                .where({ id: notice.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('notices')
                .insert(notice)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 5
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('notices').count('id').first()
        const count = parseInt(result.count)

        app.db('notices')
            .select('id', 'name', 'description', 'imageUrl', 'userId')
            .limit(limit).offset(page * limit - limit)
            .then(notices => res.json({ data: notices, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('notices')
            .where({ id: req.params.id })
            .first()
            .then(notice => {
                notice.content = notice.content.toString()
                return res.json(notice)
            })
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('notices')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Notícia não foi encontrada.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    return { save, remove, get, getById }
}