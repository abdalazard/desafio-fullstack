import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  topView: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    padding: 10,
  },
  listView: {
    backgroundColor: 'white',
    flex: 1, 
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 70, 
  },
  scrollView: {
    flexGrow: 1,
  },
  listaDeObjetos: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  text: {
    fontSize: 16,
    color: 'black',
    flex: 1, 
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 5,
  },
  criacaoDeObjeto: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: { 
    flex: 1,
    flexDirection: 'column',

   },
  input: { 
    minWidth: '70%',
    borderColor: 'black', 
    borderWidth: 1, 
    borderRadius: 15, 
    padding: 10, 
  },  
  addButton: {
    backgroundColor: '#000',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
});

export default styles;
