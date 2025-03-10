import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../../utils/style-guide'

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  },
  fileList: {
    marginTop: '8px',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: colors.neutralLight,
    borderRadius: '4px',
    marginBottom: '8px',
  },
  fileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: colors.neutralLight,
    borderRadius: '4px',
  },
  errorMessage: {
    marginBottom: '8px',
  },
})
