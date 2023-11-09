import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-heading">Vaccination by Age</h1>

      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationByAge}
          cx="50%"
          cy="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

//  <ResponsiveContainer width="100%" height={300}>

export default VaccinationByAge
