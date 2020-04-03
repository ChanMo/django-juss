import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import TablePagination from '@material-ui/core/TablePagination'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import BackupIcon from '@material-ui/icons/Backup';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`image-picker-tab${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const UploadBox = ({onChoice}) => {
  const handleUpload = event => {
    if(event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = function(e) {
        fetch("/attachments/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          mode: 'cors',
          body: JSON.stringify({source:e.target.result})
        }).then(res => res.json()).then(res => {
          onChoice(res.source)
        }).catch(err => console.log(err))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        id="image-picker-upload"
        style={{display:'none'}}
      />
      <label htmlFor="image-picker-upload">
        <ButtonBase
          component="div"
          style={{width:'100%',minHeight:400,alignItems:'center'}}>
          <BackupIcon size="medium" />
          <Typography
            component="span"
            color="textSecondary">点击上传</Typography>
        </ButtonBase>
      </label>
    </div>
  )
}

const ImageGrid = ({onChoice}) => {
  const [data, setData] = useState({count:0, results:[]})
  const [page, setPage] = useState(0)
  const limit = 12

  useEffect(()=>{
    const fetchData = async() => {
      const offset = page * limit
      try {
        const res = await fetch(`/attachments/?limit=${limit}&offset=${offset}`)
        const resJson = await res.json()
        setData(resJson)
      } catch {
        console.log('fetch images error')
      }
    }
    fetchData()
  }, [page])

  if(!data.count) {
    return <Box display="flex" alignItems="center" justifyContent="center" height={400}>空</Box>
  }

  return (
    <React.Fragment>
    <Grid container spacing={1}>
      {data.results.map(row => (
      <Grid key={row.id} item xs={6} sm={4} md={3}>
        <ImageBox image={row} onChoice={onChoice} />
      </Grid>
      ))}
    </Grid>
    <TablePagination
      rowsPerPageOptions={[12]}
      component='div'
      count={data.count}
      rowsPerPage={limit}
      page={page}
      onChangePage={(event, value)=>setPage(value)}
    />
  </React.Fragment>
  )
}

const ImageBox = ({image, onChoice}) => (
  <Card>
    <CardActionArea onClick={()=>onChoice(image.source)}>
      <CardMedia
        style={{height:220}}
        image={image.source}
        title={image.name}
      />
    </CardActionArea>
  </Card>
)

const App = (props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(props.value)
  const [mode, setMode] = useState(0)

  const handleChoice = (value) => {
    setOpen(false)
    setValue(value)
  }

  return (
    <React.Fragment>
      {value && <img src={value} alt='img' style={{maxHeight:220,display:'block',marginBottom:8}} />}
      <Button onClick={()=>setOpen(true)} variant="contained" size="small">选择图片</Button>
      <input
        type="hidden"
        name={props.name}
        maxLength="200"
        value={value} />
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={()=>setOpen(false)}
      >
        <DialogTitle>选择图片</DialogTitle>
        <DialogContent>
          <Tabs
            value={mode}
            onChange={(event, value)=>setMode(value)}>
            <Tab label="选择" id="image-picker-tab0"></Tab>
            <Tab label="上传" id="image-picker-tab1"></Tab>
          </Tabs>
          <TabPanel value={mode} index={0}>
            <ImageGrid onChoice={handleChoice} />
          </TabPanel>
          <TabPanel value={mode} index={1}>
            <UploadBox onChoice={handleChoice} />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>取消</Button>
          <Button color='primary' onClick={()=>setOpen(false)}>确定</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

App.propTypes = {
  id: PropTypes.id,
  name: PropTypes.string,
  value: PropTypes.string
}

ReactDOM.render(<App {...window.props}/>, document.getElementById(window.props.id));
