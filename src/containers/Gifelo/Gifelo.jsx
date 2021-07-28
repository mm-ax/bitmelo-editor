import { parseGIF, decompressFrames } from 'gifuct-js'
//import { palette } from '../PalettePicker/PalettePicker'
//import ConvertData from 'bitmelo'
//import jsonFileBitmelo from './Гриби_і_Слизні.project.json'
//import {handleAddClicked} from '../PalettePicker/PalettePicker'
import React, { useState, createRef } from 'react'
import Modal from '../../components/Modal/Modal';
import './Gifelo.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addPaletteColorSet } from '../../state/Palette/colors'
import { setTilesetLayerData } from '../../state/Tileset/tilesets';

//import { importProjectData, resetProject, clearAllUndoHistory } from '../../state/globalActions';
import { rgbToHex } from '../../utils/hexConvert';


function mapStateToProps(state) {
    return {
        existingPalette: state.palette.colors,
        tileset: state.tileset,
        tileSize: state.project.tileSize,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        _addPaletteColorSet: addPaletteColorSet,
        _setTilesetLayerData: setTilesetLayerData,
    }, dispatch);
}

const Gifelo = (props) => {
    const fileInput = createRef()
    const [isModal, setIsModal] = useState()
    const [frames, setFrames] = useState()
    const [gifPalette, setGifPalette] = useState()
    function gifToFrames(file) {
        file.arrayBuffer()
            .then((buff) => {
                let gif = parseGIF(buff)
                let f = decompressFrames(gif, true)
                let newPalette = []; // all colors from gif file

                for (let frame of f) {
                    for (let colorArray of frame.colorTable) {
                        let colorHex = rgbToHex(colorArray[0], colorArray[1], colorArray[2]);
                        if (newPalette.indexOf(colorHex) == -1)
                            newPalette.push(colorHex)
                    }
                }

                setGifPalette(newPalette)
                setFrames(f)
                //ConvertData.compressedStringToArray
            })
    }
    return (
        <div style={{ alignSelf: 'center', marginRight: 10 }}>
            { isModal &&
                <Modal
                    showHeader
                    title="Import gif file"
                    onClose={() => { setIsModal(false) }}
                    style={{}}
                >
                    <div>
                        {frames ? `frames : ${frames.length}
                             colors : ${gifPalette.length}`
                            : null}
                        <button
                            className="gifeloButton"
                            onClick={() => {
                                let oldColors = props.existingPalette

                                let paletteFoundI = -1
                                for (let i = 0; i < oldColors.length; i++) {
                                    let x = 0
                                    for (; x < gifPalette.length; x++) {
                                        let oldColor = oldColors[i + x]
                                        let newColor = gifPalette[x]
                                        if (oldColor != newColor)
                                            break
                                    }
                                    if (x == gifPalette.length) {
                                        paletteFoundI = i
                                        break
                                    }
                                }

                                if (paletteFoundI == -1) {
                                    props._addPaletteColorSet(gifPalette)
                                    paletteFoundI = oldColors.length
                                }
                                else {
                                    paletteFoundI = oldColors.length - gifPalette.length
                                }

                                /*const selection = {
                                    selectedTile: 3,
                                    selectionWidth: props.tileset.selectionWidth,
                                    selectionHeight: props.tileset.selectionHeight,
                                    tileSize: props.tileSize,
                                };*/

                                const gifSize = 16
                                let newData = []
                                for (let i = 0; i < frames[0].pixels.length; i++) {
                                    let pixelY = Math.floor(i / gifSize)
                                    let pixelX = i % gifSize
                                    let pixel = frames[0].pixels[ (gifSize - pixelY - 1)*gifSize+pixelX ]
                                    let colorArray = frames[0].colorTable[pixel]
                                    let colorHex = rgbToHex(colorArray[0], colorArray[1], colorArray[2]);
                                    for (let x = 0; x < gifPalette.length; x++) {
                                        if (gifPalette[x] == colorHex) {
                                            // todo some gif may suppose that black is transparent
                                            
                                            if (colorHex == '000000')
                                                newData.push(0)
                                            else
                                                newData.push(x + paletteFoundI)
                                            break
                                        }
                                    }
                                }
                                
                                const selection = {
                                    selectedTile: 5,
                                    selectionWidth: 1,
                                    selectionHeight: 1,
                                    tileSize: props.tileSize
                                }
                                props._setTilesetLayerData(newData, 0, 0, selection);
                                //add_PaletteColorSet(frames ? frames[0].colorTable : null)
                                setIsModal(false)
                                //handleAddClicked(frames[0].colorTable[0])
                            }}

                        >
                            Import
            </button>
                    </div>
                </Modal>
            }
            <button
                className="gifeloButton"
                onClick={() => fileInput.current.click()}
            >
                Choose gif file
            </button>
            <input
                ref={fileInput}
                type="file"
                onChange={e => {
                    gifToFrames(e.target.files[0])
                    setIsModal(true)
                    console.log(e.target.files[0])
                    fileInput.current.value = null
                    //_frames = gifToFrames
                }}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Gifelo);