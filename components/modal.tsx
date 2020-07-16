import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Modal, Spin, List } from 'antd';
import { SmileOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

interface ModalProps {
    visibleStatus : boolean,
    dataRender : any,
    CloseModalFunc : () => void
}
const antIcon = <SmileOutlined style={{ fontSize: 32, color:'#f67023' }} spin />;

export interface flagkomboy {
    svgFile : string
}

export interface CurrencyBos {
    name: string,
	code: string
}

export interface detailCountrData {
    alpha3Code: string,
    capital: string,
    currencies: CurrencyBos[],
    flag: flagkomboy,
    __typename:string,
    name: string,
    population: number
}

const ModalInfo  = (props : ModalProps) => {
    
    const [fiteredData, setFilteredData] = useState([])
    const [countryFlag, setCountryFlag] = useState(false)
    const [detailCountry, setDetailCountry] = useState<detailCountrData>({})
    const { Meta } = Card

    const ResetData = () => {
        setFilteredData(props.dataRender)
        setCountryFlag(false)
    }

    const FilterData = (filterKey : string, typeName : string) => {

        let type : string = ""
        if(typeName == "Region") {
            type = "subregions"
        }
        if(typeName == "Subregion") {
            type = "countries"
        }
        if(typeName == "Country") {
            type = "countries"
        }
        // let dataType = {
        //     "Region" : "subregions",
        //     "subregions" : "countries"
        // }
        // console.log(filterKey, typeName, "<<<<<<<<<<<<<<<<<<<<<<<<<<" );
        
        if(typeName == "Country") {
            setCountryFlag(true)
            let index = fiteredData.findIndex((obj : any) => obj.name == filterKey )
            console.log(fiteredData, "<<<<<<<<<<<<<<<<<<<< country kah");
            
            console.log(fiteredData[index], "<<<<<<<<<<<<<<<<<<<<<");
            setDetailCountry(fiteredData[index])
        } else {
            let index = fiteredData.findIndex((obj : any) => obj.name == filterKey )
            setFilteredData(fiteredData[index][type])
        }
        
    }

    useEffect(() => {
        setFilteredData(props.dataRender)
    }, [props.dataRender])
    return (
        <div>
             <Modal
                visible={props.visibleStatus}
                closable={false}
                cancelButtonProps={{style: {backgroundColor: '#f67023', color : 'black', fontWeight:'bold', borderRadius:'15px'}}}
                okButtonProps={{style: {backgroundColor: '#f67023', color : 'black', fontWeight:'bold', borderRadius:'15px'}}}
                okText="Close"
                cancelText="Reset"
                onOk={props.CloseModalFunc}
                onCancel={ResetData}
                afterClose={ResetData}
                >
                <Row gutter={8}>
                    {fiteredData.length == 0  ?
                    <Col span={8} offset={8} style={{display:'flex', justifyContent:'center'}}><Spin indicator={antIcon} /></Col>
                     : 
                     (countryFlag ? 
                        <Col style={{display:'flex', justifyContent:'center'}} span={24}>
                            <Card
                            bordered={false}
                                style={{ width: 300 }}
                                cover={
                                <img
                                    alt="example"
                                    src={detailCountry.flag.svgFile}
                                    className={"imageFlag"}
                                />
                                }
                                actions={[
                                <div>
                                    <p style={{color:'black', fontWeight:'bold', marginBottom:'0px'}}>Population</p>
                                    <p style={{color:'black', fontWeight:'bold'}}>{detailCountry.population.toLocaleString('en')}</p>
                                </div>,
                                 <div>
                                 <p style={{color:'black', fontWeight:'bold', marginBottom:'0px'}}>Currency</p>
                                 <p style={{color:'black', fontWeight:'bold'}}>{detailCountry.currencies[0].code}</p>
                             </div>,
                                 <div>
                                 <p style={{color:'black', fontWeight:'bold', marginBottom:'0px'}}>Country Code</p>
                                 <p style={{color:'black', fontWeight:'bold'}}>{detailCountry.alpha3Code}</p>
                             </div>,
                                ]}
                            >
                                <Meta
                                title={detailCountry.name}
                                description={`Capital City : ${detailCountry.capital}`}
                                />
                                
                            </Card>
                        </Col> 
                    : 
                        fiteredData.map((region :  any, index: number) => (
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} key={index}>
                                <div onClick={() => FilterData(region.name, region.__typename) }>
                                <Card style={{marginTop:'5px'}}  bordered={true}>
                                {region.name}
                                </Card>
                                </div>
                                
                            </Col>
                        )))
                    
                    }
                </Row>
            </Modal>
        </div>
    )
}

export default ModalInfo
