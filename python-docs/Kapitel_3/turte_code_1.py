import turtle

fenster = turtle.Screen()
fenster.bgcolor("black")
kurt = turtle.Turtle()
kurt.penup() # Wir wollen erstmal nur springen, nicht zeichnen
kurt.color("white")

# Eine Liste von Koordinaten für ein Dreieck
punkte = [(0,0), (100,0), (50,86.6)] # (x,y) Paare

for punkt in punkte:
    kurt.goto(punkt) # Gehe zum nächsten Punkt in der Liste
    kurt.stamp() # Hinterlasse einen Schildkröten-Abdruck 🐢

# Zurück zum Start und dann zeichnen
kurt.goto(punkte[0]) # Gehe zum ersten Punkt
kurt.pendown()
for punkt in punkte:
    kurt.goto(punkt)
kurt.goto(punkte[0]) # Schließe das Dreieck

fenster.mainloop()