import PropTypes from 'prop-types';
import styled from 'styled-components';

const AboveStats = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    width: 460px;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-left: 10px;
`;
const StatsBlock = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    border: 1px solid rgba(70, 77, 82, 0.082);
    border-radius: 13px;
    padding: 20px 20px 20px 20px;
    width: 100px;
    background-color: rgb(167, 167, 255);
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
        // todayCnt.clearCnt,
        todayCnt.deathCnt,
        todayCnt.accExamCnt,
        // todayCnt.examCnt,
        // todayCnt.resutlNegCnt
    ]
    const yesterStats = [
        yesterdayCnt.decideCnt,
        // yesterdayCnt.clearCnt,
        yesterdayCnt.deathCnt,
        yesterdayCnt.accExamCnt,
        // yesterdayCnt.examCnt,
        // yesterdayCnt.resutlNegCnt
    ]
    const statsName = ["확진환자",  "사망자", "누적 의심신고 검사자"];
    return(
            <AboveStats>
                {todayStats.map((stat, i)=>
                    <StatsBlock key={i}>
                        <StatCnt>{stat.toLocaleString()}</StatCnt>
                        <CompareStats>({(stat - yesterStats[i]).toLocaleString()})</CompareStats>
                        <AboveStatsName>{statsName[i]}</AboveStatsName>
                    </StatsBlock>
                )}
                <StatFooter>
                    <FooterItem>
                        <FooterStatTitle>격리 중</FooterStatTitle>
                        <FooterStatNum>{(todayCnt.decideCnt - todayCnt.clearCnt - todayCnt.deathCnt).toLocaleString()}</FooterStatNum>
                    </FooterItem>
                    <FooterItem>
                        <FooterStatTitle>추가 확진자</FooterStatTitle>
                        <FooterStatNum>{(todayCnt.decideCnt - yesterdayCnt.decideCnt).toLocaleString()}</FooterStatNum>
                        </FooterItem>
                    <FooterItem>
                        <FooterStatTitle>일일 완치자</FooterStatTitle>
                        <FooterStatNum>{(todayCnt.clearCnt - yesterdayCnt.clearCnt).toLocaleString()}</FooterStatNum>
                    </FooterItem>
                </StatFooter>
            </AboveStats>          
    )
}

InfectionStats.propTypes = {
    todayCnt: PropTypes.object.isRequired,
    yesterdayCnt: PropTypes.object.isRequired
}
export default InfectionStats;