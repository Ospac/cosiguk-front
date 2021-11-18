import PropTypes from 'prop-types'
import styles from './InfectionStats.module.css'
function InfectionStats ({todayCnt, yesterdayCnt}){
    const todayStats = [
        todayCnt.decideCnt,
        todayCnt.clearCnt,
        todayCnt.deathCnt,
        todayCnt.accExamCnt,
        todayCnt.examCnt,
        todayCnt.resutlNegCnt
    ]
    const yesterStats = [
        yesterdayCnt.decideCnt,
        yesterdayCnt.clearCnt,
        yesterdayCnt.deathCnt,
        yesterdayCnt.accExamCnt,
        yesterdayCnt.examCnt,
        yesterdayCnt.resutlNegCnt
    ]
    const statsName = ["확진환자", "완치(격리 해제)", "사망자", "누적 검사 수", "검사중", "결과 음성"];
    return(
        <div>   
            <div className={styles.aboveStats}>
                {todayStats.map((stat, i)=>
                    <div key={i} className={styles.statsBlock}>
                        <div className={styles.statCnt}>{stat.toLocaleString()}</div>
                        <div className={styles.compareStats}>({(stat - yesterStats[i]).toLocaleString()})</div>
                        <div className={styles.aboveStatsName}>{statsName[i]}</div>
                        <div></div>
                    </div>
                )}
                <div className={styles.memoStats}>
                    <div className={styles.memoStatItem}>
                        <div className={styles.memoStatTitle}>격리 중</div>
                        <div className={styles.memoStatNum}>{(todayCnt.decideCnt - todayCnt.clearCnt - todayCnt.deathCnt).toLocaleString()}</div>
                    </div>
                    <div className={styles.memoStatItem}>
                        <div className={styles.memoStatItem}>추가확진자 수</div>
                        <div className={styles.memoStatNum}>{(todayCnt.decideCnt - yesterdayCnt.decideCnt).toLocaleString()}</div>
                    </div>
                    <div className={styles.memoStatItem}>
                        <div className={styles.memoStatTitle}>일일 완치자</div>
                        <div className={styles.memoStatNum}>{(todayCnt.clearCnt - yesterdayCnt.clearCnt).toLocaleString()}</div>
                    </div>
                </div>
            </div>
            <div>
            </div>            
        </div>
    )
}

InfectionStats.propTypes = {
    todayCnt: PropTypes.object.isRequired,
    yesterdayCnt: PropTypes.object.isRequired
}
export default InfectionStats;