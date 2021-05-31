import React from 'react';

const Form = props => {
    return (
        <form onSubmit={props.submit}>
            <input value={props.value} type="text" placeholder="Wyszukaj miasto" onChange={props.onChange} />
            <button>Wyszukaj</button>
        </form>
    )
}

export default Form