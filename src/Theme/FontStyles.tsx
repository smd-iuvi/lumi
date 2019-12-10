import { createGlobalStyle } from 'styled-components'

// import MetropolisBold from '../assets/fonts/Metropolis-Bold.otf'
// const MetropolisMedium = '../assets/fonts/Metropolis-Medium.otf'
// const MetropolisRegular = '../assets/fonts/Metropolis-Regular.otf'

export default createGlobalStyle`
    @font-face {
        font-family: small;
        font-size: 48px;
        font-weight: 700;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: normal;
    }

    h1 {
        font-weight: 900;
    }
`
