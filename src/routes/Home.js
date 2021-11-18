import {useState, useEffect} from "react";
import axios from 'axios';
import styles from "./Home.module.css"
import InfectionStats from '../components/InfectionStats.js'
import InfectionByCity from '../components/InfectionByCity.js'

function Home(){
    let loadCnt = 0;
    const [isLoading, setLoading] = useState(0);
    const [infectionStatusData, setInfectionStatusData] = useState([]);
    const [infectionCityData, setInfectionCityData] = useState([]);

    useEffect(() => {
        getInfectionStatus(); 
        getInfectionCity();
       },[]);
    async function getInfectionStatus(){
        await axios
        .get("/api/data/infectionStatus")
        .then((response) => {
        setInfectionStatusData(response.data.response.body.items.item);
        setLoading(++loadCnt);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    async function getInfectionCity(){
        await axios
        .get("/api/data/infectionCity")
        .then((response) => {
        setInfectionCityData(response.data.response.body.items.item);
        setLoading(++loadCnt);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return(
        <div className={styles.container}>
            {isLoading === 2?
            <div>
                <div className={styles.indexContainer}>
                    <div className={styles.infectionStats_container}>
                        <InfectionStats 
                        todayCnt={infectionStatusData[0]}
                        yesterdayCnt={infectionStatusData[1]}
                        />
                    </div>
                    <div className={styles.infectionByRegion_container}>
                        <InfectionByCity cities={infectionCityData}/>
                    </div>
                </div>
            </div>
            :
            <div className={styles.loader}></div> 
            }
        </div>
    )
}
export default Home;