
//getting all the id's from the metadata
d3.json("samples.json").then(function(data){
  //getting the values from the data
  var metadata=Object.values(data.metadata);
  var id_list=[]
  metadata.forEach(item=>{
  id_list.push(item.id)
  })
//adding all the id to dropdown menu
  id_list.forEach(item=>{
  let id_opt=d3.select("#selDataset");
  let id_new_opt=id_opt.append("option")
  id_new_opt.text(item)
})
})




//default bar plot

d3.json("samples.json").then(function(data){
  //getting the values from the data
  var samples=Object.values(data.samples);
  //getting all the data
  var sliced_data=samples[0].sample_values.slice(0,10).reverse();
  var slice_id=samples[0].otu_ids.slice(0,10).reverse();
  var slice_labels=samples[0].otu_labels.slice(0,10).reverse();

  //Appening the string OTU to id's
  slice_id_list=[]
  slice_id.forEach(item=>{
    item=`OTU ${item}`
    slice_id_list.push(item);
  })

  //trace
  var trace1 = {
      x: sliced_data,
      y: slice_id_list,
      text: slice_labels,
      name: "OTU",
      type: "bar",
      orientation: "h"
    };

  // data
  var data = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Top 10 OTU's",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", data, layout);

    //default bubble plot

  //trace for bubble
  var trace_bubble = {
      x: samples[0].otu_ids,
      y: samples[0].sample_values,
      text: samples[0].otu_labels,
      mode: 'markers',
      marker: {
        size: samples[0].sample_values,
        color: samples[0].otu_ids
      }
    };
    
    //data
    var data_bubble = [trace_bubble];
    
    //layout
    var layout_bubble = {
      title: 'OTU Id and Values',
      showlegend: false,
      xaxis: {
          title: {
            text: 'OTU IDs',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          },
        },
      height: 600,
      width: 1125
    };
    //rendering the bubble plot to id bubble
    Plotly.newPlot('bubble', data_bubble, layout_bubble);
});





//default gauge chart


function gauge_chart(index){
  d3.json("samples.json").then(function(data){
  //getting the values from the data
  var metadata=Object.values(data.metadata);
  wfreq=metadata[index].wfreq

  // trace for the gauge chart
  var traceGauge = {
    type: 'pie',
    showlegend: false,
    hole: 0.4,
    rotation: 90,
    values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
    text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    direction: 'clockwise',
    textinfo: 'text',
    textposition: 'inside',
    hoverinfo:'text',
    marker: {
        colors: ['#e7e8e3','#dfe3cf','#dce3c1','#d8e3af','#d8e89e','#cee381','#c6e35d','#b9e02b','#aedb0b','white'],
        
        }
      }

  //getting the angle and radius to plot the pointer depending on washing frequency

  if(wfreq>=0 && wfreq<1){
    var degrees = 115, radius = 0.6;
  }
  else if(wfreq>=1 && wfreq<2){
    var degrees = 115, radius = 0.7;
  }
  else if(wfreq>=2 && wfreq<3){
    var degrees = 115, radius = 0.8;
  }
  else if(wfreq>=3 && wfreq<4){
    var degrees = 115, radius = 0.9;
  }
  else if(wfreq>=4 && wfreq<5){
    var degrees = 120, radius = 1;
  }
  else if(wfreq>=5 && wfreq<6){
    var degrees = 127, radius = 1;
  }
  else if(wfreq>=6 && wfreq<7){
    var degrees = 133, radius = 1;
  }
  else if(wfreq>=7 && wfreq<8){
    var degrees = 138, radius = 1;
  } 
  else if(wfreq>=8 && wfreq<9){
    var degrees = 145, radius = 1;
  }
  else{
  var degrees=150,radius=1;
  }
  
  //calculating the values based on degrees and radius

  var radians = degrees * Math.PI / 180;
  var x =-1*radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  data_gauge=[traceGauge]

  //layout for the pointer

  var layout_gauge = {
      shapes:[{
        type: 'line',
        x0: 0.5,
        y0: 0.5,
        x1: x,
        y1: y,
        line: {
          color: '#852103',
          width: 8
        }
      }],
    title: 'Belly Button Washing Frequency',
    xaxis: {visible: false, range: [-1, 1]},
    yaxis: {visible: false, range: [-1, 1]}
  };
  Plotly.newPlot('gauge', data_gauge, layout_gauge);
  });
}



//function updating demographic info


function demographic_info(index){
    let info_opt=d3.select(".panel-body");
    info_opt.html("")
    d3.json("samples.json").then(function(data){
      //getting the values from the data
    var metadata=Object.values(data.metadata);
    Object.entries(metadata[index]).forEach(([keys,values])=>{
        let new_opt=info_opt.append("p")
        var item=`${keys} : ${values}`
        new_opt.text(item)
    })
  })      
}



// //function updating the horizontal bar chart

function barchart(id){
    d3.json("samples.json").then(function(data){
    //getting the values from the data
     var samples=data.samples;
     var resultArray=samples.filter(function(data){
               return data.id === id
     })
     var result=resultArray[0];

    //using an if else since certain sample values length are less than 10

    if(result.sample_values.length<10){
        let y_data=result.sample_values.reverse();
        let x_slice_id=result.otu_ids.reverse();
        let text_slice_labels=result.otu_labels.reverse();
        x_slice_id_list=[]
        x_slice_id.forEach(item=>{
            item=`OTU ${item}`
            x_slice_id_list.push(item);
        })
        Plotly.restyle("bar", "y", [x_slice_id_list]);
        Plotly.restyle("bar", "x", [y_data]);
        Plotly.restyle("bar", "text", [text_slice_labels]);
    }
    else{
        let y_data=result.sample_values.slice(0,10).reverse();
        let x_slice_id=result.otu_ids.slice(0,10).reverse();
        let text_slice_labels=result.otu_labels.slice(0,10).reverse();
        x_slice_id_list=[]
        x_slice_id.forEach(item=>{
            item=`OTU ${item}`
            x_slice_id_list.push(item);
        })
        Plotly.restyle("bar", "y", [x_slice_id_list]);
        Plotly.restyle("bar", "x", [y_data]);
        Plotly.restyle("bar", "text", [text_slice_labels]);
    }
  })
}

//function updating the bubble chart


function bubblechart(id){
  d3.json("samples.json").then(function(data){
    //getting the values from the data
      var samples=data.samples;
      var resultArray=samples.filter(function(data){
                return data.id === id
      })
      var result=resultArray[0];
      let x=result.otu_ids
      let y=result.sample_values
      let text=result.otu_labels
      let size=result.sample_values
      let color=result.otu_ids
      Plotly.restyle("bubble","x",[x])
      Plotly.restyle("bubble","y",[y])
      Plotly.restyle("bubble","text",[text])
      Plotly.restyle("bubble","marker.size",[size])
      Plotly.restyle("bubble","marker.color",[color])
  })
  }


//function to implement when option in dropdown changes

function optionChanged(id){
    id_n=Number(id)
    //getting all the id's from the metadata
    d3.json("samples.json").then(function(data){
      //getting the values from the data
      var metadata=Object.values(data.metadata);
      var id_list=[]
      metadata.forEach(item=>{
        id_list.push(item.id)
      })
    let index=id_list.indexOf(id_n);
    demographic_info(index);
    barchart(id);
    bubblechart(id);
    gauge_chart(index);
    })
}



//default demographic info
demographic_info(0);

//default gauge chart
gauge_chart(0);
