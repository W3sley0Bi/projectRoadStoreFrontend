import { createTheme } from "@nextui-org/react"

export const theme = createTheme({
    type: "dark",
    theme: {
      colors: {
        // brand colors
        primaryLight: '$yellow200',
        primaryLightHover: '$yellow300',
        primaryLightActive: '$yellow400',
        primaryLightContrast: '$yellow600',
        primary: '#ded94a',
        primaryBorder: '$yellow500',
        primaryBorderHover: '$yellow600',
        primarySolidHover: '$yellow700',
        primarySolidContrast: '$white',
        primaryShadow: '$yellow500',
  
        gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
        link: '#5E1DAD',
  
        // you can also create your own color
        myColor: '#ff4ecd'
  
        // ...  more colors
      },
      space: {},
      fonts: {}
    }
  })