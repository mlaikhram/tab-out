import React from 'react';
import { Text } from 'react-native';
import { useDrag } from 'react-dnd';

function DraggablePayerIcon(props) {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "Payer Icon",
        item: {
            id: props.payer.id
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))

    return (
        <div ref={drag} id={props.payer.id} key={props.payer.id} style={{ height: '100%', width: props.width ? props.width : '100%', backgroundColor: props.payer.color, opacity: isDragging ? 0.5 : 1, borderRadius: 10, borderColor: '#CED4DA', borderWidth: 'thin', cursor: 'pointer' }}><Text style={{ height: '100%', width: '100%', lineHeight: '250%', fontWeight: 'bold', textShadow: '-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 2px #000, -1px -1px 2px #000', color: '#FFFFFF', textAlign: 'center' }}>{props.payer.name && props.payer.name[0]}</Text></div>
    );
}

export default DraggablePayerIcon;