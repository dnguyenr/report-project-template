import React, { useState, useEffect} from 'react';
import { CSVReaderController } from '../controllers/CSVReaderController'
import {TableDisplay} from './TableDisplay'
function TaskManager({isConfirmed, workItems}) {
  const [badges, setBadges] = useState([]);
  
  // Q = Quiz
  // W = Work
  // P = Portfolio
  // C = Challenge
  // R = Reflection
  // qwp = not done
  // cr = not returned
  // QWP = done
  // cr = returned
  // CR = close
  // Qwp = not done
  // QWp = not done
 
  useEffect(() => {
    // This code runs once after the component mounts
    const cSVReaderController = new CSVReaderController()
    // todo: get data from Ricardo json
    const _badges = cSVReaderController.getBadgesFromJson(workItems)

    // setTableStr(resultString)
    setBadges(_badges);
  }, [workItems]); // Empty dependency array means this runs once on mount

  
  return (
    <div id="app">
      <h1>Badge Overview</h1>
      
      <TableDisplay isConfirmed={isConfirmed} badges={badges} />
    
    </div>
  );
}

export default TaskManager;