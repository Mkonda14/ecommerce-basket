import { Typographie } from "@/components/typographie";
import { CheckCircle, Calendar, AlertTriangle } from "lucide-react"; // Import des icônes de Lucide React
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import des composants de shadcn
import { Badge } from "@/components/ui/badge"; // Import des composants de shadcn
import { Alert } from "@/components/ui/alert"; // Import des composants de shadcn

export const Condition = () => {
    return (
       <section className="w-full md:w-1/3 lg:w-1/4">
            <Card className="border p-4 rounded-md shadow-sm sticky top-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" /> Conditions de
          Customisation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc  space-y-4">
          <li>
            <Typographie component="p" variant="p" size="md">
              <strong>Taille des Caractères :</strong> Chaque graffiti doit
              utiliser des caractères de taille spécifique pour garantir une
              lisibilité optimale.
              <Badge className="ml-2">Important</Badge>
            </Typographie>
          </li>
          <li>
            <Typographie component="p" variant="p" size="md">
              <strong>Nombre de Mots :</strong> Le texte de chaque graffiti ne
              doit pas dépasser 10 mots pour maintenir une esthétique
              équilibrée.
            </Typographie>
          </li>
          <li>
            <Typographie component="p" variant="p" size="md">
              <strong>Délai de Commande :</strong>{" "}
              <Calendar className="inline w-5 h-5 text-blue-500" /> Le
              traitement dune commande de customisation prend en moyenne 2 à 3
              semaines.
            </Typographie>
          </li>
          <li>
            <Typographie component="p" variant="p" size="md">
              <strong>Instructions Spécifiques :</strong> Fournissez des
              instructions claires et précises pour chaque détail de la
              customisation.
            </Typographie>
          </li>
          <li>
            <Typographie component="p" variant="p" size="md">
              <strong>Matériaux et Couleurs :</strong> Assurez-vous de choisir
              des matériaux et des couleurs compatibles avec les spécifications
              de customisation.
            </Typographie>
          </li>
        </ul>
        <Alert className="flex gap-1 w-full mt-6">
            <AlertTriangle className="!w-5 !h-5 !text-yellow-500 -mt-1" />
            <p className="text-left">
                <strong className="">Attention :</strong> Toute modification après confirmation
                de la commande peut entraîner des frais supplémentaires.
            </p>
        </Alert>
      </CardContent>
    </Card>
       </section> 
    );
};
