import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Background = styled.div`
    width: 376px;
    height: 812px;
    background-color: #f9f8f8;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;


const InfoBox = styled.div`
    position: relative;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
    background-color: #ffffff;
`;

const Image = styled.img`
    width: 100px;
    height: 90px;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const InfoItem = styled.div`
    margin: 5px 0;
`;

const InfoName = styled.div`
    
`

const BtnBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
`;

const Btn = styled.button`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    width: calc(50% - 10px); 
    height: 120px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;

    &:active {
        background-color: #e0e0e0;
    }
`;

const BtnContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

const BtnText = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left
`;

const BtnTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const BtnDescription = styled.div`
    font-size: 14px;
    color: #888888;
`;

const Icon = styled.img`
    width: 54px;
    height: 54px;
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

const RankBox = styled.div`
    position: relative;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    margin-top: 30px;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const RankTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const RankAmount = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #d94844;
    margin-bottom: 10px;
`;

const RankGrade = styled.div`
    font-size: 16px;
    color: #888888;
`;

const Logo = styled.img`
    width: 25px;
    height: 24px;
    margin-left: 8px;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
    color: #d94844;
    text-align: center;
    margin-top: 30px;
`;

const IntroText = styled.div`
    font-size: 16px;
    color: #555555;
    margin-bottom: 20px;
`;

const SellerHome = () => {
    const [store, setStore] = useState({});
    const navigate = useNavigate();
    const [summaryData, setSummaryData] = useState({});
    const [sellerRank, setSellerRank] = useState('');
    const [nextRank,setNextRank] = useState('');
    const [differIncome,setDiffer] = useState(0)
    const [RankColor,setRankColor] = useState('');
    const [NextRankColor,setNextRankColor] = useState('');
    const typeMapping = {
        'BAK': '빵 & 간식류',
        'BUT': '정육 제품',
        'FRU': '과일류',
        'VEG': '채소류',
        'SID': '반찬 가게',
        'ETC': '기타',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://13.125.100.193/store/home/', {
                    withCredentials: true
                });
                const item = {
                    ...response.data,
                    type: typeMapping[response.data.type] || response.data.type,
                };
                item.open_time= item.open_time.slice(0, -3);
                item.close_time = item.close_time.slice(0, -3);
                setStore(item);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchSumData = async () => {
            try {
                const response = await axios.get('http://13.125.100.193/dashboard/summary/1');
                const data = response.data;
                setSummaryData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchSumData();
    }, []);

    useEffect(() => {
        if (summaryData.month_sales_income > 2000000) {
            setSellerRank('다이아');
        } else if (summaryData.month_sales_income > 950000) {
            setSellerRank('플레티넘');
            setNextRank('다이아');
            setDiffer(1200000-summaryData.month_sales_income);
            setRankColor('56f0d1');
            setNextRankColor('3a86f0');
        } else if (summaryData.month_sales_income > 650000) {
            setSellerRank('골드');
            setNextRank('플레티넘');
            setDiffer(950000-summaryData.month_sales_income);
            setRankColor('f5da54');
            setNextRankColor('56f0d1');
        } else if (summaryData.month_sales_income > 350000) {
            setSellerRank('실버');
            setNextRank('골드');
            setDiffer(650000-summaryData.month_sales_income);
            setRankColor('4f4f4f');
            setNextRankColor('f5da54');
        } else {
            setSellerRank('브론즈');
            setNextRank('실버');
            setDiffer(350000-summaryData.month_sales_income);
            setRankColor('765a22');
            setNextRankColor('4f4f4f');
        }
    }, [summaryData]);

    return (
        <Background>
            <Title>
                내 가게
                <Logo src="../assets/logo_red.png" />
            </Title>
            <IntroText>내 가게 정보를 확인하고 관리할 수 있어요</IntroText>
            <InfoBox>
                <Image src={`http://13.125.100.193${store.photo}`} alt="Store" />
                <InfoItem>{store.name}</InfoItem>
                <InfoItem>업종: {store.type}</InfoItem>
                <InfoItem>전화번호: {store.tel}</InfoItem>
                <InfoItem>영업 시간: {store.open_time} ~ {store.close_time} </InfoItem>
            </InfoBox>
            <BtnBox>
                <Btn onClick={() => navigate('/productregi')}>
                    <BtnContent>
                        <BtnText>
                            <BtnTitle>떨이하기</BtnTitle>
                            <BtnDescription>지금 떨이 시작하기</BtnDescription>
                        </BtnText>
                        <Icon src="./src/assets/discount.svg" alt="Discount" />
                    </BtnContent>
                </Btn>
                <Btn onClick={() => navigate('/sellingmanage')}>
                    <BtnContent>
                        <BtnText>
                            <BtnTitle>상품관리</BtnTitle>
                            <BtnDescription>내가 올린 상품 관리하기</BtnDescription>
                        </BtnText>
                        <Icon src="./src/assets/apple.svg" alt="Manage Product" />
                    </BtnContent>
                </Btn>
                <Btn onClick={() => navigate('/sellinghistory')}>
                    <BtnContent>
                        <BtnText>
                            <BtnTitle>판매내역</BtnTitle>
                            <BtnDescription>판매 내역 한번에 보기</BtnDescription>
                        </BtnText>
                        <Icon src="./src/assets/receipt.svg" alt="Sales History" />
                    </BtnContent>
                </Btn>
                <Btn onClick={() => navigate('/dashboard')}>
                    <BtnContent>
                        <BtnText>
                            <BtnTitle>판매 통계</BtnTitle>
                            <BtnDescription>대시보드 확인하기</BtnDescription>
                        </BtnText>
                        <Icon src="./src/assets/graph.svg" alt="Sales Stats" />
                    </BtnContent>
                </Btn>
            </BtnBox>
            <RankBox>
                <RankTitle>이번 8월 떨이 판매 금액</RankTitle>
                <RankAmount>{summaryData.month_sales_income}원</RankAmount>
                <RankGrade><span style={{color:`#${RankColor}`}}>{sellerRank}</span> 등급이에요</RankGrade>
                <RankGrade><span style={{color:`#${NextRankColor}`}}>{nextRank}</span> 등급 까지 {differIncome}원 남았어요!</RankGrade>
            </RankBox>

            <div style={{ marginLeft: "10px", marginTop: "20px", fontSize: "14px", color: "gray" }}>
                Copyright CarrotCake in Inha Univ, All Right Reserved.
            </div>
        </Background>
    );
};

export default SellerHome;
