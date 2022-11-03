import AmountUserAccess from "../models/AmountUserAccess";

class CheckAccesService {
  async checkAccessVerification(filter) {
    const accessLogs = await AmountUserAccess.findAll({
        where: filter,
        raw:true,
        attributes: ['status'],
        order: [['id', 'DESC']],
        limit: 3
     });

    return accessLogs.length === 3 && accessLogs.every(log => {
        return log.status === 'FAIL'
    })
 };
}
export default new CheckAccesService();
