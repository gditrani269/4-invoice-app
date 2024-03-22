import { useEffect, useState } from "react";

export const FormItemsView = ({ handler }) => {

    const [formItemsStates, setFormItemsStates] = useState ({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = formItemsStates;

    useEffect (() => {
        //        console.log ("El precio cambio");
    }, [price]); //aca se dispara el evento cada vez que se hace un cambio en price
        
    useEffect (() => {
//        console.log ("El FORM cambio");
    }, [formItemsStates]);//si cambia cualquier campo del formulario se dispara este evento, ya que se pudo el nombre del form.

    const onInputChange = ( {target: {name, value}}) => {
    //        console.log (name)
    //        console.log (value)
    
        setFormItemsStates ({
            ...formItemsStates,
            [ name ]: value
        });
    }

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault ();

        if (product.trim().length <= 1 ) return ;
        if (price.trim().length <= 1 ) return ;
        if (isNaN(price.trim())) {
            alert ('Error el precio ingresado no es un numero')
            return ;
        }
        if (quantity.trim().length < 1 ) {
            alert ('Error la cantidad tiene que ser mayor a 0')
            return ;
        }
        if (isNaN(quantity.trim())) {
            alert ('Error la cantidad ingresada no es un numero')
            return ;
        }

        handler (formItemsStates);

        setFormItemsStates ({
            product: '',
            price: '',
            quantity: '',
        })
    }

    return <>
        <form className="w=50" onSubmit ={ event => onInvoiceItemsSubmit (event)}>
            <input 
                type="text" 
                name="product" 
                value={product}
                placeholder="Producto"
                className="form-control m-3" 
                onChange ={ event => onInputChange (event)}/>
            <input 
                type="text" 
                name="price" 
                value={price}
                placeholder="Precio"
                className="form-control m-3" 
                onChange ={ event => onInputChange (event)} />
            <input 
                type="text" 
                name="quantity" 
                value={quantity}
                placeholder="Cantidad"
                className="form-control m-3" 
                onChange ={ event => onInputChange (event)} />
            <button 
                type="submit" 
                className="btn btn-primary m-3">
                Nuevo Item
            </button>
        </form>
    
    </>
}