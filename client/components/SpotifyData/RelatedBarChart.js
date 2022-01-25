import React from 'react';
import {Line, Bar, Pie} from 'react-chartjs-2';

const BarChartRelated = (props) => {

  const relatedArtists = props.relatedArtists

  const getLabels = (array) => {
    let labels = []
    for (let i = 0; i < array.length; i++) {
      labels.push(array[i].name)
    }

    return labels
  }

  const getPopularity = (array) => {
    let popularity = []
    for (let i = 0; i < array.length; i++) {
      popularity.push(array[i].popularity)
    }

    return popularity
  }

  const labels = getLabels(relatedArtists)
  const popularity = getPopularity(relatedArtists)

  console.log("Labels", labels)
  console.log("Popularity", popularity)

  const artists = {
    labels: labels,
    datasets: [
      {
        label: '# Users',
        fill: false,
        lineTension: 1,
        backgroundColor: ['rgb(255,173,0)', 'rgb(225, 40, 163)', 'rgb(109, 241, 216)', 'rgb(57,255,20)', 'rgb(73,14,97', 'rgb(21, 108, 219)','rgb(0,0,139)', 'rgb(124, 82, 168)', 'rgb(1, 234, 169)', 'rgb(204, 102, 0)', 'rgb(255, 153, 204)', 'rgb(15,84,65)'],
        borderColor: 'rgba(255,255,255,255)',
        borderWidth: 2,
        data: popularity
      }
    ]
  }

  return (
      <div>

      <div>
      <div>
        <div>
          <div>

         </div>

         <div className="text-center">
          </div>
            <div className="chart"
              data={artists}
              options={{
                title:{
                  display:true,
                  text:'Artist Popularity',
                  fontSize: 20
                },
                legend:{
                  display:true,
                  position:'right'
                },
                plugins: {
                  legend: {
                      labels: {
                          font: {
                              size: 12,
                              family: "'Poppins', sans-serif"
                          },
                      }
                  },

              },
              }}
              />
          </div>
        </div>


      </div>

     </div>
    );
}

export default BarChartRelated;
