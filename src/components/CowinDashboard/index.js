import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    status: apiStatus.initial,
    vaccinationData: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
  }

  componentDidMount() {
    this.setState({status: apiStatus.inProgress})

    this.getCovidVaccinationData()
  }

  getCovidVaccinationData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const vaccinationArray = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const vaccinationGender = data.vaccination_by_gender.map(each => ({
        count: each.count,
        gender: each.gender,
      }))
      const vaccinationAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))
      this.setState({
        status: apiStatus.success,
        vaccinationData: vaccinationArray,
        vaccinationByGender: vaccinationGender,
        vaccinationByAge: vaccinationAge,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {vaccinationData, vaccinationByGender, vaccinationByAge} = this.state

    return (
      <>
        <VaccinationCoverage vaccinationData={vaccinationData} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className=""
        alt="failure view"
      />
      <h1 className="head-failure">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderComponents = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-con">
        <div className="con">
          <div className="inner-con">
            <div className="cowin-head">
              <img
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
                className="website-logo"
              />
              <p className="cowin-head-para">CO-WIN</p>
            </div>
            <h1 className="con-para">CoWIN Vaccination in India</h1>
          </div>
          {this.renderComponents()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard

// <VaccinationCoverage />
