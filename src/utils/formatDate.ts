import formatDistance from 'date-fns/formatDistance';
import ruLand from 'date-fns/locale/ru'

export const formaDate = (date: Date ): string => {
    return formatDistance(
        date, 
        new Date(),
        {locale: ruLand}
    )
}