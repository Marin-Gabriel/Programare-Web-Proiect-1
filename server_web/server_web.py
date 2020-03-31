import socket
import os
import threading

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)
def server():
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
		car_fisier=os.stat(r"C:\Users\G4BY\Desktop\PW\Proiect\proiect1-Marin-Gabriel\continut\\"+aux);

		#clientsocket.send("Content-Length:"+str(car_fisier.st_size) +"\n".encode())
		try:
			fisier = open(r"C:\Users\G4BY\Desktop\PW\Proiect\proiect1-Marin-Gabriel\continut\\" + aux, "rb")
			citit = fisier.read()
			print(citit)
			clientsocket.send('HTTP/1.0 200 OK\n'.encode())
			if(aux.find(".html")>-1):
				clientsocket.send("Content-Type:text/html\n".encode())
			elif (aux.find(".css") > -1):
				clientsocket.send("Content-Type:text/css\n".encode())
			elif (aux.find(".js") > -1):
				clientsocket.send("Content-Type:application/js\n".encode())
			elif (aux.find(".png") > -1):
				clientsocket.send("Content-Type:text/png\n".encode())
			elif (aux.find(".jpeg") > -1):
				clientsocket.send("Content-Type:text/jpeg\n".encode())
			elif (aux.find(".gif") > -1):
				clientsocket.send("Content-Type:text/gif\n".encode())
			elif (aux.find(".ico") > -1):
				clientsocket.send("Content-Type:image/x-icon\n".encode())
			#clientsocket.send('Content-Type: text/html\n'.encode())
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
		except:
			clientsocket.send("HTTP/1.0 404 Not Found\n".encode())
		finally:
			fisier.close()

threads=[]
for _ in range(3):
	t=threading.Thread(target=server)
	t.start()
	threads.append(t)

for thread in threads:
	thread.join()