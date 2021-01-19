import { useState, useEffect } from 'react'
import * as Types from '../types'

const CELL_SIZE = 20
const BOARD_SIZE = 20 * 20

const useCellState = () => {

  const [cellData, setCellData] = useState<Types.ICellData>()
  const [isRunning, setIsRunning] = useState(false)
  const [generation, setGeneration] = useState(0)
  const [loop, setLoop] = useState()

  const directions = [1, -1, CELL_SIZE, -CELL_SIZE, (CELL_SIZE+1), -(CELL_SIZE+1), (CELL_SIZE-1), -(CELL_SIZE-1)]

  useEffect(() => {
    setCellData(generateCellData())
  }, [])

  useEffect(
    () => {
      if(isRunning) {
        setLoop(
          setInterval(() => {
            setGeneration(generation + 1)
            setCellData(getNextGeneration());
          }, 100)
        )
      }
  
      return function cleanup() {
        clearInterval(loop)
      }
    },
    [cellData, isRunning]
  )

  const generateCellData = ():Types.ICellData => {
    let cellData = []
    let id = 0
    for (let x = 0; x < CELL_SIZE; x++) {
        for (let y = 0; y < CELL_SIZE; y++) {
          cellData.push({ id, x, y, isLive: false })
          id++
        }
    }
    return cellData as Types.ICellData
  }

  const updateCellData = (id: string, mode: string) => {
    switch(mode) {
      case 'reset': 
        setIsRunning(false)
        setGeneration(0)
        setCellData(generateCellData()) 
        break;
      case 'select': 
        setCellData(cellData?.map((cell) => 
          cell.id === parseInt(id) ? 
            { ...cell, isLive: !cell.isLive } :
            cell
        ) as Types.ICellData)
        break;
      case 'simulation':
        setIsRunning(true)
        break;              
      default: break;              
    }
  }

  const getNextGeneration = ():Types.ICellData => 
    cellData?.map((cell) => {
      const neighbourCount = getNeighbourCount(cell)
      let isLive = false
      if(!cell.isLive && neighbourCount === 3) {
        isLive = true
      }
      else if(cell.isLive && (neighbourCount === 2 || neighbourCount === 3)) {
        isLive = true
      }
      else if(cell.isLive && neighbourCount < 2) {
        isLive = false
      }
      else if (cell.isLive && neighbourCount > 3) {
        isLive = false
      }
      return {
        ...cell, isLive
      }
    }) as Types.ICellData

  const wrapRow = (value:any) => (value + BOARD_SIZE) % (BOARD_SIZE)

  const getNeighbourCount = (cell: Types.ICell):number => {
    const id = parseInt(cell.id)
    return directions.reduce((count, direction) => { 
      if(cellData){
        let neighbour = cellData[wrapRow(id + direction)]
        if(neighbour && neighbour.isLive){
           count = count + 1
        }
      } 
      return count
    }, 0);
  }

  return {
    cellData,
    updateCellData,
    isRunning,
    generation,
    getNextGeneration,
    setCellData,
  } 

}

export default useCellState