import UserService from '../services/UserService';

class UserController {
        async store(req, res) {
            try {
                const data = {
                    name: req.data.name,
                    password: req.data.password,
                    email: req.data.email
                };

                const { id, name, email } = await UserService.create(data);

                return res.json({ id, name, email });
            } catch (e) {
                return res.status(400).json('Erro ao criar o usuário.');
            }
        }
    
        async index(req, res) {
            try {
                const user = await UserService.index();
                
                return res.json(user)
                } catch(e) {
                return res.status(400).json('Erro ao listar usuário.');
            }
        }

        async update(req, res) {
            try {
                const filter = {
                    id: req.params.id
                }
                const changes = {};
                
                if (req.body.name) {
                    changes.name = req.body.name;
                }

                if (req.body.email) {
                    changes.email = req.body.email;
                }

                if (req.body.password) {
                    changes.password = req.body.password;
                } 

                const user = await UserService.update(filter, changes);
                
                return res.json(user)
                } catch(e) {
                return res.status(400).json('Erro ao atualizar usuário.');
            }
        }

        async delete(req, res) {
            try {
                const { id } = req.filter;

                if (!id) {
                    return res.json('ID não existe')
                }

                const userId = await UserService.delete(id);

                return res.json(userId);
            } catch(e) {

                return res.status(400).json('Erro ao deletar usuário.');
            }
        }

        async login(req, res) {
            try {
                const data = {
                    password: req.data.password,
                    email: req.data.email
                };

                const token = await UserService.login(data);

                return res.json(token);
            } catch (e) {
                return res.status(401).json('Dados inválidos');
            }
        }

        async show(req, res) {
            try {
                const user = await UserService.show(req.filter.id);
               
                return res.json(user);
            } catch (e) {
                return res.status(401).json(e.message);
            }
        }
}


export default new UserController();