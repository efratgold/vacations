import dal from "../4-utils/dal";


async function addFollow(userId: number, vacationId: number) {

const sql = `INSERT INTO followers VALUES(?,?)`;
await dal.execute(sql, [userId, vacationId]);

}
async function unFollow(userId: number, vacationId: number): Promise<void> {

    const sql = `DELETE FROM followers WHERE userId =? AND vacationId =?`;
    await dal.execute(sql, [userId, vacationId]);
    
    }

export default {
    addFollow,
    unFollow
    
}