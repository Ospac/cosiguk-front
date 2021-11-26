import axios from 'axios';
import styled from 'styled-components'
import UseAsync from "../hooks/UseAsync.js";
import InfectionStats from '../components/InfectionStats.js'
import InfectionByCity from '../components/InfectionByCity.js'

const IndexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const InfectionStatsContainer  = styled.div`
`;
const InfectionByRegionContainer = styled.div`
`;

function Home(){
    async function getInfectionStatus(){
        const response = await axios.get("/api/data/infectionStatus");
        return response.data;
    }
    async function getInfectionCity(){
        const response = await axios.get("/api/data/infectionCity");
        return response.data;
    }
    const [infStatState, statRefetch] = UseAsync(getInfectionStatus, []);
    const [infCityState, cityRefetch] = UseAsync(getInfectionCity, []);
    const {loading : infStatLoading, data : infStatData, error : infStatError} = infStatState;
    const {loading : infCityLoading, data : infCityData, error : infCityError} = infCityState;

    if(infStatLoading || infCityLoading) return <div>Loading</div>;
    if(infStatError || infCityError) return <div>error page</div>;
    if(!infStatData || !infCityData) return <div>loading</div>
    const infectionStatusData = infStatData.response.body.items.item;
    const infectionCityData = infCityData.response.body.items.item;

    return(
        <IndexContainer>
            <InfectionStatsContainer>
                <InfectionStats 
                todayCnt={infectionStatusData[0]}
                yesterdayCnt={infectionStatusData[1]}
                />
            </InfectionStatsContainer>
            <InfectionByRegionContainer>
                <InfectionByCity cities={infectionCityData}/>
            </InfectionByRegionContainer>
        </IndexContainer>
    )
}
export default Home;