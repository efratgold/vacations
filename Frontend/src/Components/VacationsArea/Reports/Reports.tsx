import "./Reports.css";
import React, { useEffect, useState } from 'react';
import json2csv from 'json2csv';
import VacationModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationService";
import notifyService from "../../../Services/NotifyService";


function Reports(): JSX.Element {
  
    const [vacations , setVacations] = useState<VacationModel[]>([]);

    
    useEffect(()=> {

        vacationService.getAllVacations()
                .then(dbVacations => setVacations(dbVacations))
                .catch(err => notifyService.error(err));
           
    }, []);

    // const handleDownloadCSV = () => {
    //     try {
    //       const csv = json2csv.parse(vacationDestinations);
    //       const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //       const csvURL = URL.createObjectURL(csvData);
    //       const tempLink = document.createElement('a');
    //       tempLink.href = csvURL;
    //       tempLink.setAttribute('download', 'vacation_destinations.csv');
    //       document.body.appendChild(tempLink);
    //       tempLink.click();
    //       document.body.removeChild(tempLink);
    //     } catch (error) {
    //       console.error('Error generating CSV:', error);
    //     }
    //   };
      

    return (
        <div className="Reports">
			
        </div>
    );
}

export default Reports;
