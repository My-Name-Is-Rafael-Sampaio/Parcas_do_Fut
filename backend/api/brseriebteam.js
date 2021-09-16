module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const brseriebteam = { ...req.body }
        if (req.params.id) brseriebteam.id = req.params.id

        try {
            existsOrError(brseriebteam.position, 'Posição não informada!')
            existsOrError(brseriebteam.name, 'Nome não informado!')
            existsOrError(brseriebteam.pts, 'Pontuação não informada!')
            existsOrError(brseriebteam.pj, 'Partida(s) jogada(s) não informada(s)!')
            existsOrError(brseriebteam.vit, 'Número de vitória(s) não informada(s)!')
            existsOrError(brseriebteam.e, 'Número de empate(s) não informado(s)!')
            existsOrError(brseriebteam.der, 'Número de derrota(s) não informada(s)!')
            existsOrError(brseriebteam.gp, 'Número de gol(s) a favor(es) não informado(s)!')
            existsOrError(brseriebteam.gc, 'Número de gol(s) contra não informado(s)!')
            existsOrError(brseriebteam.sg, 'Número de saldo de gol não informado!')

            const brseriebteamFromDB = await app.db('brseriebteams')
                .where({ name: brseriebteam.name }).first()
            if (!brseriebteam.id) {
                notExistsOrError(brseriebteamFromDB, 'Time já cadastrado.')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (brseriebteam.id) {
            app.db('brseriebteams')
                .update(brseriebteam)
                .where({ id: brseriebteam.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('brseriebteams')
                .insert(brseriebteam)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('brseriebteams')
            .select('id', 'position', 'name', 'pts', 'pj', 'vit', 'e', 'der', 'gp', 'gc', 'sg')
            .then(brseriebteams => res.json(brseriebteams))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('brseriebteams')
            .select('id', 'position', 'name', 'pts', 'pj', 'vit', 'e', 'der', 'gp', 'gc', 'sg')
            .where({ id: req.params.id })
            .first()
            .then(brseriebteam => res.json(brseriebteam))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('brseriebteams')
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