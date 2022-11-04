import AmountUserAccess from "../models/AmountUserAccess";

class AmountUserAccessService {
  async checkAccessVerification(filter) {
    const accessLogs = await AmountUserAccess.findAll({
        where: filter,
        raw:true,
        attributes: ['status'],
        order: [['id', 'DESC']],
        limit: 3,
        logging: true
     });

    return accessLogs.length === 3 && accessLogs.every(log => {
        return log.status === 'FAIL'
    })
 };
}
export default new AmountUserAccessService();
