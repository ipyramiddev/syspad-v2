import React from "react";
import vestingSchedule from "../../assets/data/vestingSchedule";

const VestingSchedule = () => {
  return (
    <table class="vesting-schedule table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Token Perchentage</th>
          <th scope="col">Token Amount</th>
        </tr>
      </thead>
      <tbody>
        {vestingSchedule.map(({ id, date, time, token, amount }) => (
          <tr key={id}>
            <td>
                <span>{date}</span>
                <span>{time}</span>
            </td>
            <td><span>{token}</span></td>
            <td><span>{amount}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VestingSchedule;
