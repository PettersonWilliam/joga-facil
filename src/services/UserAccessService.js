import UserAccessLogs from "../models/UserAccessLogs";

class UserAccessService {
  async checkAccessVerification(userId) {
    const accessLogs = await UserAccessLogs.findAll({
        raw: true,
        where: {
          user_id: userId
        },
        attributes: ['status'],
        order: [['id', 'DESC']],
        limit: 3
    });

    return accessLogs.length === 3 && accessLogs.every(log => {
      return log.status === 'FAIL'
    });
 };
}
export default new UserAccessService();
