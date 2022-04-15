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
            <div style={{ width: 540 }}>
                <Typography variant="subtitle1" color="text.grey.light" style={{ textAlign: "center" }}>Управляйте размером шрифта, цветами и фоном. Эти настройки влияют на все учетные записи Твиттера на этом устройстве.</Typography>
                <Typography variant="body1" color="text.grey.light">фон</Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel  onClick={() => dispatch(setTheme(ThemeStatus.LIGHT))} value="light" control={<Radio />} label="По умолчанию" />
                    <FormControlLabel onClick={() => dispatch(setTheme(ThemeStatus.DARK))} value="dark" control={<Radio />} label="Ночь" />
                </RadioGroup>

            </div>
        </ModalBlock>
    )
}

export default SettingTheme
