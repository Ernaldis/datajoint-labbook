import React from 'react';
import './TableListLoading.css';

/**
 * Empty table list loading component that shows up when user is waiting for the table list
 */
 export default class TableListLoading extends React.Component {
  render() {
    return (
      <div className="tableListSkeletons"> {
          [...Array(14)].map((value: undefined, index: number) => {
            return (
              <div className="tableSkeleton" key={index}>
                <div className="tableTierLabelSkeleton"></div>
                <div className="tableNameSkeleton"></div>
              </div>
              )
            })
          }
      </div>
    )
  }
}