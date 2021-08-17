import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../App.css";

function Test() {
  // here you set a state to tell the component it need to wait
  //  until the result is fetched from the api
  const [loadingData, setLoadingData] = useState(true);
  const columns = useMemo(() => [
    {
      
        name: "Short Url",
        selector: "id",
        sortable: true,
      },
    {
      name: "Long Url",
      selector: "longurl"
    },
    {
    name: "Created Date",
    selector: "createddate",
    }
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get("/api/redirectUrl/shortUrl/")
        .then((response) => {
          // check if the data is populated
          console.log(response.data.Items);
          setData(response.data.Items);
          // you tell it that you had the result
          setLoadingData(false);
        });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  return (
    <div className="row">
      {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
      {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (<div>
        <h4 className="text-center">List of URLS</h4>
        <DataTable noHeader={true} center="true" columns={columns} data={data} />
       </div>
        
      )}
    </div>
  );
}

export default Test;