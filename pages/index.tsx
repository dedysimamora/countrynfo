
import React, {useState} from 'react'
import Link from 'next/link'
import Layout from "../components/layout"
import { Card, Col, Row, Button, Space } from 'antd';
import Modal from '../components/modal';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

const Country = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [dataRegionRender, setDataRegionRender] = useState([])
  const client = new ApolloClient({
    uri: 'https://countries-274616.ew.r.appspot.com',
  });

  const getDataOceanFunct = () => {
      setModalVisible(true)
        client
        .query({
          query: gql`
          query {
            Region {
              name
              subregions  {
                name
                countries {
                  name
                  alpha3Code,
                  capital,
                  population
                  currencies {
                    name
                    code
                  }
                  flag {
                    svgFile
                  }
                }
              }
            
              # check the docs for more info
            }
          }
          `
        })
        .then((result) => {
          console.log(result.data, "<<<<<<<<<<<<<<<<<<<");
          setDataRegionRender(result.data.Region)
          // setDataRegionRender(result.data.Region)
        })
        .catch((error) => {
          console.log(error);
          
        })
      }

 

  const Openmodal = () => {
    setModalVisible(true)
  }
  const CloseModal = () => {
    setModalVisible(false)
  }
  return (
    <Layout>
       <Row style={{ height:"100%"}} > 
        <Col style={{ height:"100%"}} span={24}>
           <div style={{display:'flex', justifyContent:'center', marginTop:'250px'}}>
           <Button style={{backgroundColor:'#f67023', color:'black', fontWeight:'bold'}} shape="round"  size="large" onClick={getDataOceanFunct}>
              START
            </Button>
           </div>
        </Col>
    </Row>
    <Modal visibleStatus={modalVisible} CloseModalFunc={CloseModal} dataRender={dataRegionRender}  />
    </Layout>
   
  )
}

export default Country
