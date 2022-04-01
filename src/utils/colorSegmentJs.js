/* eslint-disable */
function getColorSegment(geojson, colors, fields) {
  debugger;
  // let colors = ['#f6801f','#fab523','#dec446','#a6a482','#8590a5','#7385b9',
  // '#4269ed','#5c92fb','#7fb7fd','#b1d9f9','#c7e8f7']

  // colors = ['#f6801f','#dec446','#a6a482','#8590a5','#7385b9',
  // '#4269ed','#5c92fb','#7fb7fd']
  // jsonInfo = this.currentAreaData;
  let arr = [];
  geojson.features.forEach((item) => {
    let properties = item.properties;
    if (properties[fields] !== 0) {
      arr.push(properties[fields]);
    }
  });
  /* 线性色阶 */
  //       arr.sort(function(a, b){return a-b});

  //       let basic = ["interpolate",
  //                 ["linear"],
  //                 ["get",this.currentStaticType]]

  /* 
    税bixi效果
    */
  arr.sort(function (a, b) {
    return b - a;
  });
  let firstM, secondM, thirdM, forthM;
  firstM = Math.floor(arr[0] * 100) / 100;
  secondM = Math.floor(arr[1] * 100) / 100;
  thirdM = Math.floor(arr[2] * 100) / 100;
  forthM = Math.floor(arr[3] * 100) / 100;

  let lastM = Math.floor(arr[arr.length - 1] * 100) / 100;

  let arrl = arr.length;
  let colorl = colors.length;

  let colorSegment = [
    "case",
    [">", ["get", fields], firstM],
    colors[0], // <10.8
    [">", ["get", fields], secondM],
    colors[1], // >=10.8 & <17.2
    [">", ["get", fields], thirdM],
    colors[2],
    [">", ["get", fields], forthM],
    colors[3],
  ];

  if (arrl >= 10) {
    let int = Math.floor((forthM - lastM) / colors.length);
    let j = 4;
    for (let i = 4; i < colorl; i += 1) {
      let num = Math.floor(arr[i] * 100) / 100;
      if (num - int * (i - 4) > lastM) {
        let basic1 = [">", ["get", fields]];
        basic1.push(Math.floor((num - int * (i - 4)) * 100) / 100);
        colorSegment.push(basic1);
        colorSegment.push(colors[j]);
        j += 1;
      }
    }
    colorSegment.push(colors[colorl - 1]);
    console.log(colorSegment);
  } else {
    colorSegment.push(colors[colorl - 1]);
  }
  console.log(colorSegment);
  return colorSegment;

  // return colorSegment;
}

function getColorSegment2(geojson, colors, fields) {
  geojson.features.forEach((item) => {
    let properties = item.properties;
    if (properties[fields] !== 0) {
      arr.push(properties[fields]);
    }
  });
  arr.sort(function (a, b) {
    return b - a;
  });
}

function getPointColorSegment(geojson, colors, fields) {
  let basic = ["interpolate", ["linear"], ["get", fields]];
  let arr = [];
  geojson.forEach((item) => {
    if (!arr.includes(item[fields])) {
      arr.push(item[fields] || 0);
    }
  }); //数据从小到大排序
  arr.sort(function (a, b) {
    return b - a;
  });
  let colors_length = colors.length;
  let data_length = arr.length;
  if (colors_length > 0) {
    if (colors_length < 3) {
      if (data_length >= 2) {
        basic.push(arr[arr.length - 1]);
        basic.push(colors[0]);
        basic.push(arr[0]);
        basic.push(colors[1]);
      } else {
        basic.push(0);
        basic.push(colors[0]);
      }
    } else if (colors_length == 3) {
      basic.push(arr[arr.length - 1]);
      basic.push(colors[0]);
      if (data_length > 2) {
        let middle = Math.floor(data_length / 2);
        basic.push(arr[middle]);
        basic.push(colors[1]);
      }
      basic.push(arr[0]);
      basic.push(colors[2]);
    } else {
      if (data_length == 2) {
        basic.push(arr[arr.length - 1]);
        basic.push(colors[0]);
        basic.push(arr[0]);
        basic.push(colors[1]);
      } else if (data_length > 2) {
        basic.push(arr[arr.length - 1]);
        basic.push(colors[0]);

        if (colors_length - 4 > 0) {
          let index = Math.floor((data_length - 3) / (colors_length - 3));
          console.log(index);
          for (let i = 2; i < colors_length - 2; i++) {
            // console.log(data_length-4-index*(colors_length-2-i))
            basic.push(arr[data_length - 2 - index * (colors_length - 2 - i)]);
            basic.push(colors[i]);
          }
        }
        basic.push(arr[3]);
        basic.push(colors[colors_length - 3]);
        basic.push(arr[2]);
        basic.push(colors[colors_length - 2]);
        basic.push(arr[0]);
        basic.push(colors[colors_length - 1]);
      } else {
        basic.push(0);
        basic.push(colors[0]);
      }
    }
  } else {
    basic.push(0);
    basic.push("#f7801f");
  } //数据是从大到小排序的，线性插值中必须从小到大写 // 保证前三名是偏向黄色系，其余颜色用蓝色色系 // basic.push(180) // basic.push('#093e9a') //     basic.push(240) // basic.push('#f5fe07')

  //     basic.push(arr[arr.length-1])
  //     basic.push(colors[0])

  //     basic.push(arr[3])
  //     basic.push(colors[1])
  //

  //     basic.push(arr[2])
  //     basic.push(colors[2])

  //     basic.push(arr[0])
  //     basic.push(colors[3])

  return {
    maxValue: arr[0],
    minValue: arr[data_length - 1],
    colorSegment: basic,
  };
}

function getColorSegment3(geojson, colors, fields) {
  let basic = ["interpolate", ["linear"], ["get", fields]];
  let arr = [];
  geojson.features.forEach((item) => {
    let properties = item.properties;
    if (!arr.includes(properties[fields])) {
      arr.push(properties[fields] || 0);
    }
  }); //数据从小到大排序
  arr.sort(function (a, b) {
    return b - a;
  });
  let colors_length = colors.length;
  let data_length = arr.length;
  if (colors_length > 0) {
    if (colors_length < 3) {
      if (data_length >= 2) {
        basic.push(arr[arr.length - 1]);
        basic.push(colors[0]);
        basic.push(arr[0]);
        basic.push(colors[1]);
      } else {
        basic.push(0);
        basic.push(colors[0]);
      }
    } else if (colors_length == 3) {
      basic.push(arr[arr.length - 1]);
      basic.push(colors[0]);
      if (data_length > 2) {
        let middle = Math.floor(data_length / 2);
        basic.push(arr[middle]);
        basic.push(colors[1]);
      }
      basic.push(arr[0]);
      basic.push(colors[2]);
    } else {
      if (data_length == 2) {
        basic.push(arr[arr.length - 1]);
        basic.push(colors[0]);
        basic.push(arr[0]);
        basic.push(colors[1]);
      } else if (data_length > 2) {
        basic.push(arr[arr.length - 1]);
        basic.push(colors[0]);

        if (colors_length - 4 > 0) {
          let index = Math.floor((data_length - 3) / (colors_length - 3));
          console.log(index);
          for (let i = 2; i < colors_length - 2; i++) {
            // console.log(data_length-4-index*(colors_length-2-i))
            basic.push(arr[data_length - 2 - index * (colors_length - 2 - i)]);
            basic.push(colors[i]);
          }
        }
        basic.push(arr[3]);
        basic.push(colors[colors_length - 3]);
        basic.push(arr[2]);
        basic.push(colors[colors_length - 2]);
        basic.push(arr[0]);
        basic.push(colors[colors_length - 1]);
      } else {
        basic.push(0);
        basic.push(colors[0]);
      }
    }
  } else {
    basic.push(0);
    basic.push("#f7801f");
  } //数据是从大到小排序的，线性插值中必须从小到大写 // 保证前三名是偏向黄色系，其余颜色用蓝色色系 // basic.push(180) // basic.push('#093e9a') //     basic.push(240) // basic.push('#f5fe07')

  //     basic.push(arr[arr.length-1])
  //     basic.push(colors[0])

  //     basic.push(arr[3])
  //     basic.push(colors[1])
  //

  //     basic.push(arr[2])
  //     basic.push(colors[2])

  //     basic.push(arr[0])
  //     basic.push(colors[3])

  return {
    maxValue: arr[0],
    minValue: arr[data_length - 1],
    colorSegment: basic,
  };
}

export { getColorSegment, getColorSegment3, getPointColorSegment };

//     getColorSegment (jsonInfo) {
//       debugger
//       // let colors = ['#f6801f','#fab523','#dec446','#a6a482','#8590a5','#7385b9',
//       // '#4269ed','#5c92fb','#7fb7fd','#b1d9f9','#c7e8f7']

//       let colors = ['#f6801f','#dec446','#a6a482','#8590a5','#7385b9',
//       '#4269ed','#5c92fb','#7fb7fd']
//       jsonInfo = this.currentAreaData;
//       let arr = []
//       jsonInfo.features.forEach(item => {
//         let properties = item.properties;
//         if (properties[this.currentStaticType] !== 0) {
//           arr.push(properties[this.currentStaticType]);
//         }
//       })
//       /* 线性色阶 */
// //       arr.sort(function(a, b){return a-b});

// //       let basic = ["interpolate",
// //                 ["linear"],
// //                 ["get",this.currentStaticType]]

//       /*
//       税bixi效果
//       */
//       arr.sort(function(a, b){return b-a});
//       let firstM,secondM,thirdM,forthM
//       firstM = Math.floor(arr[0] * 100) / 100
//       secondM = Math.floor(arr[1] * 100) / 100
//       thirdM = Math.floor(arr[2] * 100) / 100
//       forthM = Math.floor(arr[3] * 100) / 100

//       let lastM = Math.floor(arr[arr.length-1] * 100) / 100

//       let arrl = arr.length;
//       let colorl = colors.length;

//       let colorSegment = [
//           'case',
//           ['>', ['get', this.currentStaticType], firstM],
//           '#fab523', // <10.8
//           ['>', ['get', this.currentStaticType], secondM],
//           '#dec446', // >=10.8 & <17.2
//           ['>', ['get', this.currentStaticType], thirdM],
//           '#a6a482',
//           ['>', ['get', this.currentStaticType], forthM],
//           '#8590a5']

//       if (arrl>=10) {
//         let int = Math.floor((forthM-lastM)/colors.length);
//         let j = 4;
//         for (let i = 4;i<colorl;i+=1) {
//           let num = Math.floor(arr[i] * 100) / 100;
//           if (num>lastM) {
//             let basic1 = ['>', ['get', this.currentStaticType]];
//             basic1.push(num);
//             colorSegment.push(basic1);
//             colorSegment.push(colors[j]);
//             j+=1;
//           }

//         }
//         colorSegment.push(colors[colorl-1])
//         console.log(colorSegment);
//       } else {
//         colorSegment.push('#8590a5')
//       }
//       console.log(colorSegment);
//       return colorSegment;

//       console.log(arr)
//       let first = Math.floor(arr[0]).toString();
//       let a = first.substring(0,1);
//       let firstM = parseInt(a.padEnd(first.length,'0'));
//       let last = Math.floor(arr[arr.length-1]).toString();
//       let b = last.substring(0,1);
//       let lastM = parseInt(b.padEnd(last.length,'0'));
//       let int = Math.round((lastM-firstM)/colors.length);
//       console.log(int)
//       let basic = ["interpolate",
//                 ["linear"],
//                 ["get",this.currentStaticType]]
//       console.log(basic.length)
//       let j = 3;
//       for (let i=0;i<colors.length-1;i++) {
//         let value = firstM + int*i;
//         basic.splice(i+j,0,value);
//         basic.splice(i+j+1,0,colors[i]);
//         j+=2
//       }
//       console.log(basic)
//       basic = ["interpolate",
//                 ["linear"],
//                 ["get","childrenNum"],
//                 0, "yellow",
//                 4, "orange",
//                 8, "orangered",
//                 12, "red"]
// return basic;
// let first,second,third
// let a,b,c
// let firstM,secondM,thirdM
// if (arr[2]>1) {
//   first = Math.floor(arr[0]).toString();
//    a= first.substring(0,1);
//   firstM= parseInt(a.padEnd(first.length,'0'));
//   second = Math.floor(arr[1]).toString();
//   b = second.substring(0,1);
//   secondM = parseInt(b.padEnd(second.length,'0'));
//   third = Math.floor(arr[2]).toString();
//   c = third.substring(0,1);
//   thirdM = parseInt(c.padEnd(third.length,'0'));
// } else {
//   if (arr[1]>1) {
//     first = Math.floor(arr[0]).toString();
//     a= first.substring(0,1);
//     firstM= parseInt(a.padEnd(first.length,'0'));
//     second = Math.floor(arr[1]).toString();
//     b = second.substring(0,1);
//     secondM = parseInt(b.padEnd(second.length,'0'));
//     thirdM = arr[2];
//   } else {
//     if (arr[0]>1) {
//       first = Math.floor(arr[0]).toString();
//       a= first.substring(0,1);
//       firstM= parseInt(a.padEnd(first.length,'0'));
//       secondM = arr[1]
//       thirdM = arr[2];
//     } else {
//       firstM = arr[0]
//       secondM = arr[1]
//       thirdM = arr[2];
//     }
//   }
// }

// let colorSegment = [
//     'case',
//     ['>', ['get', this.currentStaticType], firstM],
//     '#f6801f', // <10.8
//     ['>', ['get', this.currentStaticType], secondM],
//     '#fab523', // >=10.8 & <17.2
//     ['>', ['get', this.currentStaticType], thirdM],
//     '#dec446']

// console.log(colorSegment)

// let arrl = arr.length;
// let colorl = colors.length;
/* 
      绿色推动发展色阶
       */
// arr.sort(function(a, b){return b-a});
// let firstM,secondM,thirdM,forthM
// firstM = Math.floor(arr[0] * 100) / 100
// secondM = Math.floor(arr[1] * 100) / 100
// thirdM = Math.floor(arr[2] * 100) / 100
// forthM = Math.floor(arr[3] * 100) / 100

// let colorSegment = [
//   'case',
//   ['>', ['get', this.currentStaticType], firstM],
//   '#f6801f', // <10.8
//   ['>', ['get', this.currentStaticType], secondM],
//   '#fab523', // >=10.8 & <17.2
//   ['>', ['get', this.currentStaticType], thirdM],
//   '#dec446',
//   ['>', ['get', this.currentStaticType], forthM],
//   'rgb(25,57,183)',
//   'rgb(17,195,255)']

// return colorSegment;
// },
