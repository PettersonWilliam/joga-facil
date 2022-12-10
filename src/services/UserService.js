import User from '../models/User';
import UserAccessService from '../services/UserAccessService';
import UserAccessLogs from '../models/UserAccessLogs';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
    async create(data) {
        const totalUsers = await User.count({
            where: {
                email: data.email
            }
        });

        if (totalUsers) {
            throw new Error('Usuário já existe');
        }

        return User.create(data);
    }

    index() {
      return User.findAll({ attributes: ['id', 'name'] });
    }

    async update(filter, changes)  {
        if (changes.password) {
            changes.password = await bcrypt.hash(changes.password, 6);
        }
        return User.update(changes,   {
            where: {
                id: filter.id
            }
        });
    }


    async delete(userId) {
        await User.destroy({
            where: {
                id: userId,
                deleted_at: null
            },
            paranoid: false
        });

        return true;
    }

    async show(id) {
        const user = await User.findOne({
            where: {
                id
            },
            attributes: ['name', 'email']
        });

        if (!user) {
            throw new Error('usuario não existe.');
        }

        return user;
    }

    async login(data) {
        const user = await User.findOne({
            where: {
                email: data.email,
                is_blocked: false
            },
            raw: true,
            attributes: ['id', 'name', 'email', 'password']
        });

        if (!user) {
            throw new Error('usuario não existe');
        }

        const isValidPassword = compareSync(data.password, user.password);

        if (!isValidPassword) {
            const allowBlockUser = await UserAccessService.checkAccessVerification(user.id);

            if (allowBlockUser) {
                await User.update({
                    is_blocked: true
                }, {
                    where: {
                        id: user.id
                    }
                });

                throw new Error('Usuário bloqueado');
            }

            await UserAccessLogs.create({
                user_id: user.id,
                status: 'FAIL'
            });

            throw new Error('Senha inválida');
        }

        await UserAccessLogs.create({
            user_id: user.id,
            status: 'SUCCESS'
        });

        return jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        },  process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });

    },
};

export default new UserService();
