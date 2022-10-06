import User from '../models/User';
import bcrypt from 'bcrypt';
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

        return User.update(changes, {
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
            }
        });

        return true;
    }

    async login(filter) {
        const user = await User.findOne({
            where: {
                email: filter.email
            },
            attributes: ['id', 'name', 'email', 'password']
        });

        if (!user) {
            throw new Error();
        }

        if (!bcrypt.compareSync(filter.password, user.password)) {
            throw new Error();
        }

        return jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });
    },
};

export default new UserService();