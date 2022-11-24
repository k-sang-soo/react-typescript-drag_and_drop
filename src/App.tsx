import { GlobalStyle } from './StyledReset';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
function App() {
    const onDragEnd = () => {};
    return (
        <>
            <GlobalStyle />
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Droppable droppableId="one">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                <Draggable draggableId="first" index={0}>
                                    {(provided) => (
                                        <li {...provided.draggableProps} ref={provided.innerRef}>
                                            <span {...provided.dragHandleProps}>여기에서만 이동 가능</span>
                                            One
                                        </li>
                                    )}
                                </Draggable>
                                <Draggable draggableId="second" index={1}>
                                    {(provided) => (
                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            two
                                        </li>
                                    )}
                                </Draggable>
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    );
}

export default App;
