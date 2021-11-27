import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    width: 460px;
    margin-top:10px;
    flex-wrap: wrap;
    margin-left: 10px;
`;
const AboveStatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items : center;
    box-shadow: 0 0.1px 2px rgb(32 33 36 / 10%);
    border: 1px solid rgba(70, 77, 82, 0.2);
    border-radius: 7px;
    background: white;
    width: 440px;
    padding: 20px;
    
`;
const AboveStatsTitle = styled.div`
    font-weight: 300;
    font-size: 20px;
`;
const AboveStatsNum = styled.div`
    font-size: 25px;
    font-weight: 400;
`;
const StatsBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0.1px 2px rgb(32 33 36 / 10%);
    border: 1px solid rgba(70, 77, 82, 0.2);
    border-radius: 7px;
    padding: 20px 20px 20px 20px;
    width: 100px;
    background-color: white;
    margin: 4px 4px 4px 4px;
`;
const StatCnt = styled.div`
    font-weight: bold;
`;
const AboveStatsName = styled.div`
    font-size: 13px;
`;
const CompareStats = styled.div(AboveStatsName);

const StatFooter = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    border: 1px solid rgba(70, 77, 82, 0.082);
    border-radius: 12px;
    margin-left: 8px;
    width: 440px;
    height: 50px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
    background-color: rgb(252, 212, 152);
`;

const FooterItem = styled.div`
    padding-left: 10px;
    padding-right: 10px;
`;
const FooterStatTitle = styled.div``;
const FooterStatNum = styled.div``;

function InfectionStats ({todayCnt, yesterdayCnt}){
    const todayStats = [
        todayCnt.decideCnt,
        todayCnt.deathCnt,
        todayCnt.accExamCnt,
    ]
    const yesterStats = [
        yesterdayCnt.decideCnt,
        yesterdayCnt.deathCnt,
        yesterdayCnt.accExamCnt,
    ]
    const statsName = ["확진자",  "사망자", "누적 검사자"];
    return(
            <StatsContainer>
                <AboveStatsContainer>
                    <AboveStatsTitle>확진자:</AboveStatsTitle>
                    <AboveStatsNum>{todayCnt.decideCnt}</AboveStatsNum>
                    <AboveStatsTitle>사망자:</AboveStatsTitle>
                    <AboveStatsNum>{todayCnt.deathCnt}</AboveStatsNum>
                    <AboveStatsTitle>누적 검사자:</AboveStatsTitle>
                    <AboveStatsNum>{todayCnt.accExamCnt}</AboveStatsNum>
                </AboveStatsContainer>
                {/* {todayStats.map((stat, i)=>
                    <StatsBlock key={i}>
                        <AboveStatsName>{statsName[i]}</AboveStatsName>
                        <StatCnt>{stat.toLocaleString()}</StatCnt>
                        <CompareStats>({(stat - yesterStats[i]).toLocaleString()})</CompareStats>
                    </StatsBlock>
                )} */}
                <StatFooter>
                    <FooterItem>
                        <FooterStatTitle>격리 중</FooterStatTitle>
                        <FooterStatNum>{(todayCnt.decideCnt - todayCnt.clearCnt - todayCnt.deathCnt).toLocaleString()}</FooterStatNum>
                    </FooterItem>
                    <FooterItem>
                        <FooterStatTitle>오늘 확진자</FooterStatTitle>
                        <FooterStatNum>{(todayCnt.decideCnt - yesterdayCnt.decideCnt).toLocaleString()}</FooterStatNum>
                        </FooterItem>
                    <FooterItem>
                        <FooterStatTitle>일일 완치자</FooterStatTitle>
                        <FooterStatNum>{(todayCnt.clearCnt - yesterdayCnt.clearCnt).toLocaleString()}</FooterStatNum>
                    </FooterItem>
                </StatFooter>
            </StatsContainer>          
    )
}

InfectionStats.propTypes = {
    todayCnt: PropTypes.object.isRequired,
    yesterdayCnt: PropTypes.object.isRequired
}
export default InfectionStats;