module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const brserieateam = { ...req.body }
        if (req.params.id) brserieateam.id = req.params.id

        try {
            existsOrError(brserieateam.position, 'Posição não informada!')
            existsOrError(brserieateam.name, 'Nome não informado!')
            existsOrError(brserieateam.pts, 'Pontuação não informada!')
            existsOrError(brserieateam.pj, 'Partida(s) jogada(s) não informada(s)!')
            existsOrError(brserieateam.vit, 'Número de vitória(s) não informada(s)!')
            existsOrError(brserieateam.e, 'Número de empate(s) não informado(s)!')
            existsOrError(brserieateam.der, 'Número de derrota(s) não informada(s)!')
            existsOrError(brserieateam.gp, 'Número de gol(s) a favor(es) não informado(s)!')
            existsOrError(brserieateam.gc, 'Número de gol(s) contra não informado(s)!')
            existsOrError(brserieateam.sg, 'Número de saldo de gol não informado!')

            const brserieateamFromDB = await app.db('brserieateams')
                .where({ name: brserieateam.name }).first()
            if (!brserieateam.id) {
                notExistsOrError(brserieateamFromDB, 'Time já cadastrado.')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (brserieateam.id) {
            app.db('brserieateams')
                .update(brserieateam)
                .where({ id: brserieateam.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('brserieateams')
                .insert(brserieateam)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('brserieateams')
            .select('id', 'position', 'name', 'pts', 'pj', 'vit', 'e', 'der', 'gp', 'gc', 'sg')
            .then(brserieateams => res.json(brserieateams))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('brserieateams')
            .select('id', 'position', 'name', 'pts', 'pj', 'vit', 'e', 'der', 'gp', 'gc', 'sg')
            .where({ id: req.params.id })
            .first()
            .then(brserieateam => res.json(brserieateam))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('brserieateams')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Time não foi encontrado.')
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