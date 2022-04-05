<template>

  <div class="graph-container" >

    <div class="graph-title">{{ title }}</div>

    <div class="graph">
      <div v-if="type !== 'pie'" class="scale">
        <div class="step" :style="{'top': -10 + 'px'}">{{ Math.trunc(highestPoint) }}</div>
        <div class="step" :style="{'top': height / 4 - 10 + 'px'}">{{ Math.trunc((highestPoint / 4 ) * 3) }}</div>
        <div class="step" :style="{'top': height / 2 - 10 + 'px'}">{{ Math.trunc(highestPoint / 2) }}</div>
        <div class="step" :style="{'top': (height / 4 ) * 3 - 10 + 'px'}">{{ Math.trunc(highestPoint / 4) }}</div>
        <div class="step" :style="{'top': height - 10 + 'px'}">0</div>
      </div>

      <div v-if="type === 'bar' || type === 'slim'" class="graph">
        <div v-for="col in graph" :key="col.x">

          <div class="column">
            <div class="legend">
              <div class="legend-text">{{col.x}}</div>
            </div>

            <div class="data" :style="{'height': height + 'px'}">
              <div :class="type === 'bar' ? 'bar' : 'slim'" :style="{'height': ((col.y / height) * 100) / ratio + '%'}"></div>
              <div class="value" :style="{'bottom': ((col.y / height) * 100) / ratio + 5 + '%'}">{{ col.y }}</div>
            </div>
          </div>

        </div>
      </div>

      <div v-if="type === 'line'" class="graph">
        <div v-for="col in graph" :key="col.x">

          <div class="column">
            <div class="legend">
              <div class="legend-text">{{col.x}}</div>
            </div>

            <div class="data" :style="{'height': height + 'px'}">
              <svg v-if="col.ty" :height="height" width="70">
                <line x1="30" :y1="height - ((col.y / height) * 100) / ratio * 2" x2="70" :y2="height - ((col.ty / height) * 100) / ratio * 2" class="line"/>
              </svg>
              <div class="value" :style="{'bottom': ((col.y / height) * 100) / ratio + 5 + '%'}">{{ col.y }}</div>
            </div>
          </div>

        </div>
      </div>

    </div>


    <div v-if="type === 'pie'" class="graph-pie">
      <div v-show="pieChart.length > 0" class="pie"/>
      <div class="legend-pie">

        <div v-for="col in pie" :key="col.x">
          <div class="legend-pie-text" @mouseover="pieHover(col)">
            <div>{{col.x}}</div>
            <div class="color" :style="{'backgroundColor': col.color}"/>
          </div>

        </div>

      </div>



    </div>

    <div v-if="type === 'pie' && slice.x" class="graph-footer" style="font-size: 16px">
      <div>{{slice.x}}: </div>
      <div>{{slice.y}}</div>
      <div>({{slice.percent}}%)</div>
    </div>

    <div class="graph-footer">
      <div>Average: {{average}}</div>
      <div>Median: {{median}}</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Graph",

  props:{
    x: Array,
    y: Array,
    type: String,
    title: String,
  },

  data(){
    return {
      graph: [],
      highestPoint: 0,
      height: 200,
      average: 0,
      median: Number,
      pie: [],
      pieChart: [],
      slice: {},
    }
  },

  computed:{
    ratio(){
      return this.highestPoint / this.height
    },
  },

  methods:{
    pieHover(slice){
      this.slice = slice
    },

    generateLineGraph(){
      let graph = []
      for(let i = 0; i < this.x.length; i++){
        this.average += this.y[i]
        graph.push({x: this.x[i], y: this.y[i]})
        if(this.y[i] > this.highestPoint) this.highestPoint = this.y[i]
      }
      graph.sort((a, b) => a.x.toString() > b.x.toString() ? 1 : -1)

      for(let i = 0; i < graph.length; i++){
        if(graph[i + 1]){
          this.graph.push({x: graph[i].x, y: graph[i].y, ty: graph[i + 1].y})
        } else {
          this.graph.push({x: graph[i].x, y: graph[i].y, ty: null})
        }
      }
      this.graph.sort((a, b) => a.x.toString() > b.x.toString() ? 1 : -1)
      this.generateMetaData()
    },

    generateGraph(){
      for(let i = 0; i < this.x.length; i++){
        this.average += this.y[i]
        this.graph.push({x: this.x[i], y: this.y[i]})
        if(this.y[i] > this.highestPoint) this.highestPoint = this.y[i]
      }
      this.graph.sort((a, b) => a.x.toString() > b.x.toString() ? 1 : -1)

      if(this.type === 'pie') {
        this.generatePieChart()
      } else {
        this.generateMetaData()
      }

    },

    generatePieChart(){
      const total = this.average
      let deg = 0
      this.graph.forEach(col => {
        const color = Math.floor(Math.random()*16777215).toString(16)
        const degrees = '#' + color + ' ' + deg.toFixed(0) + 'deg, #' + color + ' ' + (deg + (col.y / total) * 360).toFixed(0) + 'deg'
        this.pieChart.push(degrees)
        this.pie.push(
            {
              x: col.x,
              y: col.y,
              percent: ((col.y / total) * 360).toFixed(1),
              degrees: degrees,
              color: '#' + color,
            }

        )
        deg += (col.y / total) * 360
      })
      this.generateMetaData()
    },

    generateMetaData(){
      this.average = (this.average / this.x.length).toFixed(2)

      const dataYRaw = [...this.y]
      const dataY = dataYRaw.sort((a, b) => a > b ? 1 : -1)
      if(dataY.length % 2){
        this.median = dataY[Math.ceil(dataY.length / 2) - 1].toFixed(1)
      } else {
        this.median = ( (dataY[Math.ceil(dataY.length / 2)] + dataY[Math.ceil(dataY.length / 2) - 1]) / 2 ).toFixed(1)
      }
    },

  },

  created(){
    if(this.type === 'line'){
      this.generateLineGraph()
    } else {
      this.generateGraph()
    }

  },
}
</script>

<style scoped>
.graph-container{
  position: relative;
  outline: 2px solid white;
  margin: 40px 20px;
  border-radius: 15px;
  padding: 50px 30px 20px 30px;
  color: white;
  background-color: #343434;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.graph-title{
  position: absolute;
  top: -14px;
  width: fit-content;
  outline: 2px solid white;
  border-radius: 14px;
  padding: 5px 20px;
  background-color: #343434;
  font-size: 14px;
}
.graph{
  display: flex;
}
.scale{
  position: relative;
  width: 50px;
  height:200px;
  font-size: 14px;
  border-right: 1px solid white;
}
.step{
  position: absolute;
}
.column{
  display: flex;
  flex-direction: column-reverse;
}
.legend{
  position: relative;
  width: fit-content;
  height: 40px;
  line-height: 40px;
}
.legend-text{
  position: absolute;
  white-space: nowrap;
  z-index: 2;
  transform: rotate(-60deg);
  transform-origin: top left;
  left: -10px;
  top: 30px;
}
.data{
  border-bottom: 1px solid white;
  width: 40px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  position: relative;
}
.slim{
  width: 4px;
  background-color: #59a551;
  border-radius: 2px 2px 0 0;
}
.bar{
  display: flex;
  width: calc(100% - 1px);
  background-color: #7b51a5;
}
.value{
  opacity: 0.7;
  font-size: 10px;
  position: absolute;
  right: 11px;
}
.graph-footer{
  font-size: 10px;
  display: flex;
  column-gap: 10px;
  margin-top: 20px;
}
.line{
  stroke: rgb(182, 38, 96);
  stroke-width:2;
}
.graph-pie{
  display: flex;
}
.pie{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  opacity: 0.5;
  background-image: conic-gradient(v-bind(pieChart));
}
.legend-pie{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 200px;
  column-gap: 20px;
  row-gap: 4px;
  margin-left: 20px;
}
.legend-pie-text{
  display: flex;
  flex-wrap: nowrap;
  column-gap: 10px;
  font-size: 14px;
}
.color{
  width: 14px;
  height: 14px;
  opacity: 0.5;
}
</style>