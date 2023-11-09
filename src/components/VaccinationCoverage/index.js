import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationData} = props
  console.log(vaccinationData)
  // const {vaccineDate, dose1, dose2} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${number.toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-by-coverage-heading">Vaccination Coverage</h1>

      <BarChart
        data={vaccinationData}
        width={1000}
        height={300}
        margin={{top: 5}}
      >
        <XAxis dataKey="vaccineDate" tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 10}} />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[5, 5, 0, 0]}
          barsize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barsize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
