/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import contract_abi from '../../../contracts/IDO_abi.json';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/init-firebase';

export default function CountDown({ data }) {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isOpen, setOpen] = useState(true);
  const [isStart, setStarted] = useState(false);
  const [project, setProject] = useState([]);
  const [startDate, setStart] = useState(0);
  const [endDate, setEnd] = useState(0);
  let current = 0;
  let duration = 0;
  let end = 0;
  
  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    if(typeof window.ethereum !== undefined) {
        async function contract() {
          await window.ethereum.enable();

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const idoContract = new ethers.Contract(project.address, contract_abi, signer);

          let now = await idoContract.getBlockTimestamp();
          current = now.toString();

          let _start = await idoContract.startDate();
          setStart(_start.toString());

          let _end = await idoContract.endDate();
          setEnd(_end.toString());
        }

        contract();

        const timeInterval = setInterval(() => {
          current = current*1 + 1;

          const start = current;
          if(current > startDate) {
            end = endDate;
            setStarted(true);
          } else {
            end = startDate;
          }
          
          const diff = end*1 - start;
          duration = diff;

          if(duration > 0) {
            setOpen(false);
            countdownTime(duration);
          }
        }, 1000);
    
        return () => clearInterval(timeInterval);
    }
  }, [project]);

  function getProject() {
    const docRef = doc(db, "ido_projects", data);

    getDoc(docRef)
            .then(response => {
              const project = response.data();
              setProject(project);
            })
            .catch(error => console.log(error.message));
  }

  const countdownTime = (diff) => {
    const d = Math.floor(diff / (3600 * 24));
    const h = Math.floor((diff % (3600 * 24)) / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = Math.floor(diff % 60);
    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  return (
    <li>
      {!isStart ? (
        <span>Starts In</span>
      ) : (
        <span>Ends In</span>
      )}
      {!isOpen ? (
        (days > 0) ? (
          <span>
            {days}d : {hours}h : {minutes}m : {seconds}s
          </span>
        ) : (
          <span>
            {hours}h : {minutes}m : {seconds}s
          </span>
        )
      ) : (
        <span>Ended</span>
      )}
    </li>
  );
}
