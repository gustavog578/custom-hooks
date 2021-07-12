import { useState, useEffect, useRef } from "react"



export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading:true, error:null});

    useEffect(() => {

      // el return se ejecuta cuando el hook se desmonta  
      return () => {
          isMounted.current = false;
      }
    }, []) // Dependencia vacia, solo se ejecuta una vez cuando se carga

    useEffect(() => {
        setState({ data:null, loading: true, error: null })

        fetch( url )
        .then( resp => resp.json())
        .then( data => {
           // setTimeout( () => {
                if(isMounted.current){
                    setState({ 
                        loading: false,
                        error: null,
                        data
                    }) 
                }
             
           // },4000 )
           
        })
        .catch( () => {
            setState({
                data: null,
                loading: false,
                error: 'No se pudo cargar la informacion'
            })
        })
    }, [url])
    return state;

}
