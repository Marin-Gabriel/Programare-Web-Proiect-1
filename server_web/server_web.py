import socket

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
	print ("#########################################################################")
	print ("Serverul asculta potentiali clienti.")
	# asteapta conectarea unui client la server
	# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
	(clientsocket, address) = serversocket.accept()
	print ("S-a conectat un client.")
	# se proceseaza cererea si se citeste prima linie de text
	cerere = ''
	linieDeStart = ''
	while True:
		data = clientsocket.recv(1024)
		cerere = cerere + data.decode()
		print ("S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------")
		pozitie = cerere.find("\r\n")
		if (pozitie > -1):
			linieDeStart = cerere[0:pozitie]
			print ("S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####")
			break
	print ("S-a terminat cititrea.")
	# TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
	poz1=cerere.find('/')
	poz2=cerere.find('HTTP/1.1')
	print(cerere[poz1+1:poz2])
	aux=cerere[poz1+1:poz2]
	fisier = open(r"C:\Users\G4BY\Desktop\PW\Proiect\proiect1-Marin-Gabriel\continut\\" + aux, "rb")
	citit = fisier.read()
	print(citit)
	clientsocket.send('HTTP/1.0 200 OK\n'.encode())
	clientsocket.send('Content-Type: text/html\n'.encode())
	clientsocket.send('\n'.encode())
	clientsocket.send(citit)
	#clientsocket.send('HTTP/1.0 200 OK\n'.encode())
	#clientsocket.send('Content-Type: text/html\n'.encode())
	#clientsocket.send('\n'.encode())  # header and body should be separated by additional newline

	#aux="""<html>
    #<body>
    #<h1>Hello World</h1>
    #"""+cerere[poz1+1:poz2]+"""
    #</body>
    #</html>"""
	#clientsocket.send(aux.encode())

	clientsocket.close()
	print ("S-a terminat comunicarea cu clientul.")