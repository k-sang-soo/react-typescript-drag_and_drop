import { GlobalStyle } from './StyledReset';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
    display: flex;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const { destination, draggableId, source } = info;
        if (!destination) return;
        if (destination?.droppableId === source?.droppableId) {
            // 같은 보드에서 움직였을 때
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                // 1) 움직이고 있는 item을 삭제
                const [removed] = boardCopy.splice(source.index, 1);
                // 2) 삭제한 item을 도착한 지점에 넣어주기
                // removed를 기존에는 draggableId 를 사용해서 삭제했는데 빠르게 똑같은 곳을 움직일 시 에러 발생함
                // 복사 된 배열에서 삭제 된 부분을 찾아서 없애줘야 오류가 안 생기는 것 같음
                boardCopy.splice(destination.index, 0, removed);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }

        if (destination?.droppableId !== source?.droppableId) {
            // cross board movement
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const destinationBoard = [...allBoards[destination.droppableId]];
                const [removed] = sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0, removed);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }

        // setToDos((oldToDos) => {
        //     const copyToDos = [...oldToDos];
        //     // 1) 움직이고 있는 item을 삭제
        //     const [removed] = copyToDos.splice(source.index, 1);
        //     // 2) 삭제한 item을 도착한 지점에 넣어주기
        //     // removed를 기존에는 draggableId 를 사용해서 삭제했는데 빠르게 똑같은 곳을 움직일 시 에러 발생함
        //     // 복사 된 배열에서 삭제 된 부분을 찾아서 없애줘야 오류가 안 생기는 것 같음
        //     copyToDos.splice(destination?.index, 0, removed);
        //     return copyToDos;
        // })
    };

    return (
        <>
            <GlobalStyle />
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        {Object.keys(toDos).map((boardId) => (
                            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
