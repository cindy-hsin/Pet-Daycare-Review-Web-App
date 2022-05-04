import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import defaultEntryPhoto from './assets/defaultDaycareImage.png'
import './Home.css';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';
const { Meta } = Card;

export default function Home() {
    const [entryData, setEntries] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    function getEntries() {
      Axios.get('/api/entries/')
        .then (response => {
          console.log("Home.jsx: successfully get entries: ", response.data);
            setEntries(response.data);})
        .catch(function(error) {
          console.log("Get entries failed in Home.jsx. Error: ", error.response.data);
        })
    }

    useEffect(getEntries, []);

    return (
        <div>
          <Row className="entry-container" type="flex">
            {entryData.map((entry) => (
              <Col className="col-style" xs={24} sm={12} md={8} lg={8} key={entry._id}>
                <Card
                  hoverable
                  cover={
                    <div
                      className="image-container"

                      onClick={() => navigate('/entries/' + entry._id)}
                    >
                      <img
                        alt={entry.name}
                        src={entry.photo ? entry.photo : defaultEntryPhoto}
                        className="card-image"
                      />
                    </div>
                  }
                >
                  <Meta
                    title={entry.name}
                    description={entry.description ? entry.description.substring(0, 100) + "..." : ""}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
}