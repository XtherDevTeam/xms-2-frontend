import * as React from 'react'
import * as Mui from '../Components'

export default function BlurBackground(props) {
    let [BlurStyle, setBlurStyle] = React.useState(<></>)
    React.useEffect(() => {
        let result = <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: `${props.backgroundColor}`,
            backdropFilter: `blur(${props.filterArg})`
        }}></div>
        setBlurStyle(result)
    }, [props])
    return (<Mui.Background img={props.img}>
        {BlurStyle}
    </Mui.Background>)
}

