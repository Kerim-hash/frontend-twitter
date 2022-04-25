import { Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { ModalBlock } from '../../Modal'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { setTheme } from '../../../store/ducks/theme/actionCreators';
import { ThemeStatus } from '../../../store/ducks/theme/contracts/state';
import {useDispatch, useSelector} from 'react-redux'
import { selectTheme } from '../../../store/ducks/theme/selectors';

interface SettingThemeProps {
    visibleAddTweetModal: boolean,
    handleToggleClick: () => void
}


const SettingTheme: React.FC<SettingThemeProps> = ({ visibleAddTweetModal, handleToggleClick }: SettingThemeProps): ReactElement => {
    const dispatch = useDispatch()
    return (
        <ModalBlock title="Настройте оформление" visible={visibleAddTweetModal} onClose={handleToggleClick}>
            <div>
                <Typography variant="subtitle1" color="text.grey.light" style={{ textAlign: "center" }}>Управляйте размером шрифта, цветами и фоном. Эти настройки влияют на все учетные записи Твиттера на этом устройстве.</Typography>
                <Typography variant="body1" color="text.grey.light" mb={3}>фон</Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{justifyContent: 'space-between'}} 
                >
                    <FormControlLabel style={{backgroundColor: '#fff',width: '45%', color: '#000', border: '1px solid #359BF0', borderRadius: '5px', padding: '10px'}}  onClick={() => dispatch(setTheme(ThemeStatus.LIGHT))} value="light" control={<Radio color="info" />} label="light" />
                    <FormControlLabel style={{backgroundColor: '#000',width: '45%', color: '#fff', border: '1px solid #359BF0', borderRadius: '5px', padding: '10px'}} onClick={() => dispatch(setTheme(ThemeStatus.DARK))} value="dark" control={<Radio color="info" />} label="dark" />
                </RadioGroup>

            </div>
        </ModalBlock>
    )
}

export default SettingTheme
