import PropTypes from 'prop-types'
import styles from './InfectionByCity.module.css'
function InfectionByCity ({cities}){
    let todayCityStats =  cities.slice(0,18);
    todayCityStats.sort((a, b) => {
        if(a.defCnt >= b.defCnt) return -1;
        else return 1;
    })
    return(
        <div>
            <div className={styles.cityStatsContainer}>
                {todayCityStats.map((city,i) => 
                    <div key={i} className={styles.cityStatsBlock}>
                        <div className={styles.cityTitle}>{city.gubun}</div>
                        <div className={styles.infoContainer}>
                            <div className={styles.isolIngTitle}>격리중</div>
                            <div className={styles.isolIngCnt}>{city.isolIngCnt}</div>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.defCntTitle}>확진환자</div>
                            <div className={styles.defCnt}>{city.defCnt}</div>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.incDecTitle}>전일대비</div>
                            <div className={styles.incDec}>{city.incDec}</div>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.isoClearTitle}>격리해제</div>
                            <div className={styles.isolClearCnt}>{city.isolClearCnt}</div>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.deathTitle}>사망자</div>
                            <div className={styles.deathCnt}>{city.deathCnt}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
InfectionByCity.propTypes = {
    cities: PropTypes.array.isRequired,
}
export default InfectionByCity;