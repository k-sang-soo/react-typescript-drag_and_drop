import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragbbleCard from './DragabbleCard';
import { ITodo, toDoState } from './../atoms';
import { useSetRecoilState } from 'recoil';

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 200px;
    padding: 10px 0;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
`;

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IAreaProps {
    draggingFromThisWith: boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
    flex-grow: 1;
    background-color: ${(props) => (props.isDraggingOver ? '#b2bec3' : props.draggingFromThisWith ? 'transparent' : 'transparent')};
    transition: background-color 0.5s ease-out;
    padding: 20px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId], newToDo],
                // [boardId]: [...allBoards[boardId], newToDo], 새로 추가되는게 위로 오게 하고 싶을 때
            };
        });
        setValue('toDo', '');
    };

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register('toDo', { required: true })} type="text" placeholder={`Add task on ${boardId}`} />
            </Form>
            <Droppable droppableId={boardId}>
                {(provided, info) => (
                    <Area isDraggingOver={info.isDraggingOver} draggingFromThisWith={Boolean(info.draggingFromThisWith)} {...provided.droppableProps} ref={provided.innerRef}>
                        {toDos.map((todo, idx) => (
                            <DragbbleCard idx={idx} key={todo.id} toDoId={todo.id} toDoText={todo.text} />
                        ))}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
